import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import Calendar from 'react-calendar';
import constantsDb from '../../constants/index';

import Api from "../../api/index"

import moment from "moment";


class BookingCalendar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            bookingPeriod: new Date(),
            bookingPeriod2: new Date(), // use for the booking body builder
            selectedDate: new Date(),
            departureTime: "",
            arrivalTime: "",
            bookingError: "",
            bodyDepartureDate: "",
            bodyArrivalDate: "",
            PERCENT_VALUE: 10,
            bookingBody: {
                bookingTotalPrice: "",
                bookingStartAt: "",
                bookingEndAt: "",
                userId: "",
                announceId:"",
                serviceId: "",
                animalsTypeId:""
            }
        };

        this.onConfirmBookingDate = this.onConfirmBookingDate.bind(this);
        this.onChangeBookingDate = this.onChangeBookingDate.bind(this);
        this.handleChangeDepartureTime = this.handleChangeDepartureTime.bind(this);
        this.handleChangeArrivalTime = this.handleChangeArrivalTime.bind(this);
    }


    applyPercent = (price) => {
      let percentTotal = Math.abs((price * this.state.PERCENT_VALUE ) / 100);
      return parseFloat( (parseInt(price) + parseInt(percentTotal) ) ).toFixed(2) ;
    };

    generatePrice = () => {
        let serviceTook =
            constantsDb
                .CONSTANTS_SERVICES_ITTERABLE
                .filter(e => e.id === parseInt(this.props.serviceChoice));

        const typeServiceName = serviceTook[0].name;

        let unit = constantsDb
            .CONSTANTS_SERVICES_UNIT_PRICE
            .find(e => {
                return e === typeServiceName;
            });

        let multiple = constantsDb
            .CONSTANTS_SERVICES_MULTIPLE_PRICE
            .find(e => {
                return e === typeServiceName;
            });


        if (unit) {
            // build real date for booking DB infos
            this.state.bookingPeriod.setHours(
                parseInt(this.state.departureTime.split(":")[0]),
                parseInt(this.state.departureTime.split(":")[1]),
                parseInt("00"));
            let nt = this.state.bookingPeriod;
            this.setState({
                bodyDepartureDate: nt
            });

            this.state.bookingPeriod2.setHours(
                parseInt(this.state.arrivalTime.split(":")[0]),
                parseInt(this.state.arrivalTime.split(":")[1]),
                parseInt("00"));
            let lb = this.state.bookingPeriod2;
            this.setState({
                bodyArrivalDate: lb
            });


            const {totalPrice} = this.calculatePrice(
                "unit",
                this.state.bodyArrivalDate,
                this.state.bodyDepartureDate,
                this.props.announce.farePerHour,
                this.props.announce.farePerDay,
                this.props.announce.farePerMonth);

            // set to the parent the totalPrice for the display
            this.props.cbPrice(this.applyPercent(totalPrice));

            return {
                body: {
                    startAt: this.state.bodyArrivalDate,
                    endAt: this.state.bodyDepartureDate,
                    totalPrice: this.state.totalPrice
                }
            }

        } else if (multiple) {
            console.log("multiple");

            let arrival = new Date(this.state.bookingPeriod[0]);
            arrival.setHours(
                parseInt(this.state.arrivalTime.split(":")[0]),
                parseInt(this.state.arrivalTime.split(":")[1]),
                parseInt("00"));
            this.setState({
                bodyArrivalDate: arrival
            });

            let departure = new Date(this.state.bookingPeriod[1]);
            departure.setHours(
                parseInt(this.state.departureTime.split(":")[0]),
                parseInt(this.state.departureTime.split(":")[1]),
                parseInt("00"));

            this.setState({
                bodyDepartureDate: departure
            });


            const {totalPrice} = this.calculatePrice(
                "multiple",
                this.state.bodyArrivalDate,
                this.state.bodyDepartureDate,
                this.props.announce.farePerHour,
                this.props.announce.farePerDay,
                this.props.announce.farePerMonth);

            // set to the parent the totalPrice for the display
            this.props.cbPrice(this.applyPercent(totalPrice));

            return {
                body: {
                    startAt: this.state.bodyArrivalDate,
                    endAt: this.state.bodyDepartureDate,
                    totalPrice: this.state.totalPrice
                }
            }


        } else {
            console.log("ERROR");
            // TODO
            this.generateBookingError("ERROR TODO")
        }

    };

    calculatePrice = (mode, date1, date2, fareHour, fareDay, fareMonth) => {

        let res = {
            totalPrice: "00.00"
        };

        // unit or multiple
        if (mode === "unit") {
            let nbHoursTotal = Math.floor(Math.abs(date1 - date2) / 36e5);
            res.totalPrice = parseFloat(nbHoursTotal * fareHour).toFixed(2);
        } else {
            // calculer en jours TODO
            // base on prix journée / semaine SI supérieur à 31 jours on se base sur le prix mois + journée
            let start = moment(date1, "YYYY-MM-DD");
            let end = moment(date2, "YYYY-MM-DD");

            //Difference in number of days
            let daysDiff = Math.abs(Math.round(moment.duration(start.diff(end)).asDays()))+1;

            //Difference in number of weeks
            let weeksDiff = Math.abs(Math.round(moment.duration(start.diff(end)).asWeeks()))+1;

            //console.log(daysDiff);
            //console.log(weeksDiff)

            // bitwsie | 0 -> better than Math.flour (too slow)
            if(weeksDiff > 4) {

                const FULL_MONTH_AS_WEEK = 4;

                let nbFullMonths = Math.abs((weeksDiff / FULL_MONTH_AS_WEEK)) | 0;
                let offsetDays = Math.abs( ( ((nbFullMonths * 4) - weeksDiff) * 7)); // days remains cant be a month

                //console.log("full month : ", nbFullMonths)
                //console.log("offset d" , offsetDays);

                let totalPriceDue = (nbFullMonths * fareMonth) + (offsetDays * fareDay);
                res.totalPrice = parseFloat(totalPriceDue).toFixed(2);

            } else {
                res.totalPrice = parseFloat(daysDiff * fareDay).toFixed(2);
            }

        }

        return res;
    };


    generateBookingError = msg => {
        this.setState({
            bookingError: msg
        });
    };

    onConfirmBookingDate() {
        console.log(" ---> BOOKING CONFIRMED todo");


        Api
            .User
            .getMe()
            .then((data) => {
                console.log(data);
                if (data.status === 200) {
                    console.log("announce", this.props.announce);
                    console.log("booking period", this.state.bookingPeriod);
                    const {userId} = data.data;
                    const {id} = this.props.announce;
                    this.generatePrice();



                    this.state.bookingBody.bookingStartAt = moment(this.state.bodyArrivalDate).format("YYYY-MM-DD HH:MM:SS");
                    this.state.bookingBody.bookingEndAt = moment(this.state.bodyDepartureDate).format("YYYY-MM-DD HH:MM:SS");
                    this.state.bookingBody.announceId = id;
                    this.state.bookingBody.userId = userId;
                    this.state.bookingBody.animalsTypeId = this.props.animalTypeChoice;
                    this.state.bookingBody.serviceId = this.props.serviceChoice;
                    this.state.bookingBody.bookingTotalPrice = this.props.price;


                    console.log("READY FOR POST : ", this.state.bookingBody);



                } else {
                    // TODO
                    console.log("API USER ERROR", data);
                }
            })
            .catch(err => console.log(err))
    }

    onChangeBookingDate(bookingPeriod) {
        console.log("service choose - parent", this.props.service)
        this.setState({
            bookingPeriod: bookingPeriod,
            bookingPeriod2: new Date(bookingPeriod)
        })
    }

    handleChangeDepartureTime(e) {
        console.log("change departure time : ", e.target.value)
        console.log(this.props.announce);
        this.setState({
            departureTime: e.target.value,
        })
    }

    handleChangeArrivalTime(e) {
        console.log("change arrival time : ", e.target.value)
        this.setState({
            arrivalTime: e.target.value
        })
    }

    render() {
        let serviceChoice = this.props.service;
        if (
            serviceChoice == constantsDb.CONSTANTS_SERVICES[0].MATINEE.id ||
            serviceChoice == constantsDb.CONSTANTS_SERVICES[0].MIDI.id ||
            serviceChoice == constantsDb.CONSTANTS_SERVICES[0].APRES_MIDI.id ||
            serviceChoice == constantsDb.CONSTANTS_SERVICES[0].SOIREE.id ||
            serviceChoice == constantsDb.CONSTANTS_SERVICES[0].NUIT.id ||
            serviceChoice == constantsDb.CONSTANTS_SERVICES[0].JOURNEE.id
        ) {
            return (
                <div>
                    <p>o</p>
                    <div className="row">
                        <div className="col-md-9">
                            <Calendar
                                minDate={new Date()}
                                hover
                                onChange={this.onChangeBookingDate}
                                value={this.state.bookingPeriod}/>

                        </div>
                        <div className="col-md-3 text-center">
                            <p>Heure arrivée</p>
                            <input type="time" id="arrival" name="departureTime"
                                   onChange={this.handleChangeDepartureTime}
                                   min="00:00" max="23:00" required/>
                            <p>Heure de départ</p>
                            <input type="time" id="departure" name="arrivalTime" onChange={this.handleChangeArrivalTime}
                                   min="00:00" max="23:00" required/>
                        </div>
                    </div>

                    <div className="text-center mb-3">
                        <button type="button" className="btn btn-success"
                                onClick={this.onConfirmBookingDate}>Confirmé
                        </button>
                    </div>

                </div>
            )

        } else {
            return (
                <div>
                    <p>o</p>
                    <div className="row">
                        <div className="col-md-9">
                            <Calendar
                                minDate={new Date()}
                                hover
                                selectRange
                                onChange={this.onChangeBookingDate}
                                value={this.state.bookingPeriod}/>

                        </div>
                        <div className="col-md-3 text-center">
                            <p>Heure arrivée</p>
                            <input type="time" id="arrival" name="departureTime"
                                   onChange={this.handleChangeDepartureTime}
                                   min="00:00" max="23:00" required/>
                            <p>Heure de départ</p>
                            <input type="time" id="departure" name="arrivalTime" onChange={this.handleChangeArrivalTime}
                                   min="00:00" max="23:00" required/>
                        </div>
                    </div>

                    <div className="text-center mb-3">
                        <button type="button" className="btn btn-success"
                                onClick={this.onConfirmBookingDate}>Confirmé
                        </button>
                    </div>

                </div>
            )
        }

    }

}

export default withRouter(BookingCalendar);

import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import Calendar from 'react-calendar';
import constantsDb from '../../constants/index';

import Api from "../../api/index"

import JWTService from "../../services/JwtService";
import jwtManager from "jsonwebtoken";
import {jwt} from "../../api/config";



class BookingCalendar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            bookingPeriod: new Date(),
            selectedDate: new Date(),
            departureTime: "",
            arrivalTime: "",
        };

        this.onConfirmBookingDate = this.onConfirmBookingDate.bind(this);
        this.onChangeBookingDate = this.onChangeBookingDate.bind(this);
        this.handleChangeDepartureTime = this.handleChangeDepartureTime.bind(this);
        this.handleChangeArrivalTime = this.handleChangeArrivalTime.bind(this);
    }

    onConfirmBookingDate(){
        console.log(" ---> BOOKING CONFIRMED todo")

        Api
            .User
            .getMe()
            .then( (data) => {
                console.log(data);
                if(data.status === 200) {
                    const userId = data.data.userId;
                    console.log("booking period", this.state.bookingPeriod);
                    console.log("booking § departure", this.state.departureTime);
                    console.log("booking @ arrival  ", this.state.arrivalTime);
                    console.log("Booking userid", userId);
                } else {
                    console.log("API USER ERROR", data);
                }
            })
            .catch( err => console.log(err))


        // TODO -> recuperer l'userId (regler l'erreur CORS);
        // REPARER LES routes users côté api
        // TODO -> recuperer le service id / animal type id / announce id / calculer la somme dûe et creer le booking (API - POST)
        /*
        jwtManager
            .verify(JWTService.getAccessToken(), jwt.secret_dev, (err, decoded) => {
                if(err){
                    console.log("error jwt deoced", err)
                } else {
                    console.log("jwt decoded", decoded)
                }
            });
            */
    }
    onChangeBookingDate(bookingPeriod) {
        console.log("service choose - parent", this.props.service)
        this.setState({
            bookingPeriod: bookingPeriod
        })
    }

    handleChangeDepartureTime(e){
        console.log("change departure time : ", e.target.value)
        console.log(this.props.announce);
        this.setState({
            departureTime : e.target.value
        })
    }
    handleChangeArrivalTime(e){
        console.log("change arrival time : ", e.target.value)
        this.setState({
            arrivalTime: e.target.value
        })
    }

    render() {
        let serviceChoice = this.props.service;
        if(
            serviceChoice == constantsDb.CONSTANTS_SERVICES.MATINEE.id ||
            serviceChoice == constantsDb.CONSTANTS_SERVICES.MIDI.id ||
            serviceChoice == constantsDb.CONSTANTS_SERVICES.APRES_MIDI.id ||
            serviceChoice == constantsDb.CONSTANTS_SERVICES.SOIREE.id ||
            serviceChoice == constantsDb.CONSTANTS_SERVICES.NUIT.id ||
            serviceChoice == constantsDb.CONSTANTS_SERVICES.JOURNEE.id
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
                            <input type="time" id="arrival" name="departureTime" onChange={this.handleChangeDepartureTime}
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

        }  else {
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
                            <input type="time" id="arrival" name="departureTime" onChange={this.handleChangeDepartureTime}
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


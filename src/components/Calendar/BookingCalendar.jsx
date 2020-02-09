import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import Calendar from 'react-calendar';
import constantsDb from '../../constants/index';


class BookingCalendar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            bookingPeriod: new Date(),
            selectedDate: new Date(),
            departureTime: "",
            arrivalTime: "",
        };

        this.onChangeBookingDate = this.onChangeBookingDate.bind(this);
        this.handleChangeDepartureTime = this.handleChangeDepartureTime.bind(this);
        this.handleChangeArrivalTime = this.handleChangeArrivalTime.bind(this);
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

                </div>
            )
        }

    }

}

export default withRouter(BookingCalendar);


import React from 'react';
import Api from '../../api/index';
import Footer from '../../components/Partials/Footer';
import {withRouter} from "react-router-dom";
import {getLoadingText} from '../LoaderSettings';
import LoadingOverlay from 'react-loading-overlay';
import Calendar from 'react-calendar';


import {displayCurrency, displayDate, capitalize} from "../Utils";

class AnnouncesProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            delay: 10,
            announce: {
                city: "" // to avoid undefined when we using method for display
            },
            bookingBtnDisabled: true,
            bookingPeriod: new Date()
        };

        this.onChangeBookingDate = this.onChangeBookingDate.bind(this);
        this.onConfirmBookingDate = this.onConfirmBookingDate.bind(this);
    }


    componentDidMount() {
        // url
        const {uuid} = this.props.match.params;

        // call APIs
        setTimeout( () => {
            this.getAnnounce(uuid);
        }, this.state.delay)
    }


    onChangeBookingDate(bookingPeriod){
        console.log(bookingPeriod)
        this.setState({
            bookingPeriod : bookingPeriod
        })
    }

    onConfirmBookingDate(){
        console.log("CONFIRMED -> ", this.state.bookingPeriod)

    }

    

    async getAnnounce(uuid) {
        try {
            const {data, status} = await Api.Announces.getOne(uuid);

            if (status === 200) {
                this.setState({
                    announce: data,
                    isLoading: false
                });
            } else {
                // todo -> error
                this.setState({
                    isLoading: false
                })
            }

        } catch (e) {
            // todo -> error
            this.setState({
                isLoading: false
            });
            console.log("error -> ", e)
        }
    }


    render() {
        return (
            <div>
                {
                    JSON.stringify(this.state.announce)
                }
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text={getLoadingText()}>

                    <div className="container white darken-4 rounded-1 p-4 mt-2">

                        <div className="card">

                            <div className="card-body">
                                <h3 className="card-title">{this.state.announce.title}</h3>
                                <h4 className=""> <i className="fa fa-map-marker-alt"></i> {this.state.announce.dept} - { capitalize(this.state.announce.city)} , {this.state.announce.streetAddress}</h4>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="">
                                            <span className="badge badge-info ml-2"><i className="fas fa-clock"></i> {this.state.announce.farePerHour}{displayCurrency(this.state.announce.currency)}</span>
                                            <span className="badge badge-info ml-2"><i className="fas fa-calendar-day"></i> {this.state.announce.farePerDay}{displayCurrency(this.state.announce.currency)}</span>
                                            <span className="badge badge-info ml-2"><i className="fa fa-calendar-alt"></i>  {this.state.announce.farePerMonth}{displayCurrency(this.state.announce.currency)}</span>
                                        </div>
                                        <p className="card-text mt-2">{this.state.announce.description}</p>

                                        <hr></hr>


                                        <div className="row m-3">
                                            <div className="col-md-6">
                                                <h5>Service</h5>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Animal</h5>
                                            </div>
                                        </div>

                                        <span className="small red-text">Choisissez votre type d'animaux et votre service</span>
                                        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#modalBooking" disabled={this.state.bookingBtnDisabled}>
                                            Réserver
                                        </button>


                                        <div className="modal fade" id="modalBooking" tabindex="-1" role="dialog" aria-labelledby="modalBooking"
                                             aria-hidden="true">

                                            <div className="modal-dialog modal-dialog-centered" role="document">


                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="bookingModalLongTitle">Réservation</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <Calendar
                                                                    minDate={new Date()}
                                                                    hover
                                                                    selectRange
                                                                    onChange={this.onChangeBookingDate}
                                                                    value={this.state.bookingPeriod}/>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="text-center mb-3">
                                                        <button type="button" className="btn btn-success" onClick={this.onConfirmBookingDate}>Confirmé</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="view overlay">
                                            <img className="card-img-top"
                                                 src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                                                 alt="Card image cap"/>
                                                <a href="#!">
                                                    <div className="mask rgba-white-slight"></div>
                                                </a>
                                        </div>
                                    </div>
                                </div>

                                <a href="#" className="btn btn-primary">Retour</a>
                                <a href="#" className="btn btn-primary">Suivante</a>


                            </div>

                        </div>


                    </div>

                </LoadingOverlay>


                <Footer></Footer>

            </div>
        )

    }
}


export default withRouter(AnnouncesProfile);

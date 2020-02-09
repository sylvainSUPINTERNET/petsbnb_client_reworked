import React from 'react';
import Api from '../../api/index';
import Footer from '../../components/Partials/Footer';
import {withRouter} from "react-router-dom";
import {getLoadingText} from '../LoaderSettings';
import LoadingOverlay from 'react-loading-overlay';
import BookingCalendar from '../../components/Calendar/BookingCalendar';

import {capitalize, displayCurrency} from "../Utils";

class AnnouncesProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            delay: 10,
            announce: {
                city: "", // to avoid undefined when we using method for display
                equipments: [],
                services: [],
                animalsType: []
            },
            bookingBtnDisabled: true,
            services: [],
            animalsType: [],
            animalTypeChoice: "",
            serviceChoice: "",
        };

        this.handleChangeAnimalTypeChoiceId = this.handleChangeAnimalTypeChoiceId.bind(this);
        this.handleChangeServiceChoiceId = this.handleChangeServiceChoiceId.bind(this)
        this.bookingBtnEnabled = this.bookingBtnEnabled.bind(this);
    }


    componentDidMount() {
        // url
        const {uuid} = this.props.match.params;

        // call APIs
        setTimeout(() => {
            this.getAnnounce(uuid);
            this.getServices();
            this.getAnimalsType();
        }, this.state.delay)
    }




    handleChangeAnimalTypeChoiceId(event) {
        this.setState({
            animalTypeChoice : event.target.value
        }, async () => {
            this.bookingBtnEnabled();
        });
    }

    handleChangeServiceChoiceId(event) {
        this.setState({
            servicesChoice : event.target.value
        }, async () => {
            this.bookingBtnEnabled();
        });
    }

    bookingBtnEnabled() {

        if (this.state.animalTypeChoice !== "" && this.state.servicesChoice !== "") {
            this.setState({
                bookingBtnDisabled: false
            });
        }

        console.log("c", this.state.servicesChoice)
        console.log("b", this.state.animalTypeChoice)
    }

    test(){
        console.log(this.state.servicesChoice)
        return this.state.servicesChoice
    }

    /**
     * Get all animalsType to generate list
     * @returns {Promise<void>}
     */
    async getAnimalsType() {
        try {

            const {data, status} = await Api.AnimalsType.list();
            if (status === 200) {
                console.log("animalsType data ");
                console.log(data);
                this.setState({
                    animalsType: data,
                    isLoading: false
                });
            } else {
                this.setState({
                    isLoading: false
                });
            }
        } catch (e) {
            this.setState({
                isLoading: false
            });
            console.log("error api animalsType-> ", e)
        }
    }

    /**
     * Get all services for the list generation
     * @returns {Promise<void>}
     */
    async getServices() {
        try {
            const {data, status} = await Api.Services.list();
            if (status === 200) {
                console.log("SERVICES data ")
                console.log(data);
                this.setState({
                    services: data,
                    isLoading: false
                })
            } else {
                this.setState({
                    isLoading: false
                })
            }
        } catch (e) {
            console.log("get services error : ", e);
            this.setState({
                isLoading: false
            });
        }
    }

    async getAnnounce(uuid) {
        try {
            const {data, status} = await Api.Announces.getOne(uuid);

            if (status === 200) {
                console.log("DATA")
                console.log(data);
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
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text={getLoadingText()}>

                    <div className="container white darken-4 rounded-1 p-4 mt-2">

                        <div className="card">

                            <div className="card-body">
                                <h3 className="card-title">{this.state.announce.title}</h3>
                                <h4 className=""><i
                                    className="fa fa-map-marker-alt"></i> {this.state.announce.dept} - {capitalize(this.state.announce.city)} , {this.state.announce.streetAddress}
                                </h4>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="">
                                            <span className="badge badge-info ml-2"><i
                                                className="fas fa-clock"></i> {this.state.announce.farePerHour}{displayCurrency(this.state.announce.currency)}</span>
                                            <span className="badge badge-info ml-2"><i
                                                className="fas fa-calendar-day"></i> {this.state.announce.farePerDay}{displayCurrency(this.state.announce.currency)}</span>
                                            <span className="badge badge-info ml-2"><i
                                                className="fa fa-calendar-alt"></i> {this.state.announce.farePerMonth}{displayCurrency(this.state.announce.currency)}</span>
                                        </div>
                                        <p className="card-text mt-4">{this.state.announce.description}</p>

                                        {this.state.announce.equipments.length > 0 &&
                                        <div className="mt-4">
                                            <div>
                                                {this.state.announce.equipments.map(equipment => {
                                                    return <div className="row" key={equipment.id}>
                                                        <div className="col">
                                                            <i className="fa fa-check green-text"></i> {equipment.name}
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                        }

                                        <hr></hr>


                                        <div className="row m-3">
                                            <div className="col-md-6">
                                                <h5>Service</h5>
                                                <label>
                                                    <select value={this.state.servicesChoiceId}
                                                            className="browser-default custom-select"
                                                            onChange={this.handleChangeServiceChoiceId}>
                                                        <option value="" disabled selected>Choisissez votre service
                                                        </option>
                                                        {this.state.announce.services.map((e, key) => {
                                                            return <option key={key} value={e.id}>{e.name}</option>;
                                                        })}
                                                    </select>
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <h5>Animal</h5>
                                                <label>
                                                    <select value={this.state.animalsTypeChoiceId}
                                                            className="browser-default custom-select"
                                                            onChange={this.handleChangeAnimalTypeChoiceId}>
                                                        <option value="" disabled selected>Choisissez votre type
                                                            d'animal
                                                        </option>
                                                        {this.state.announce.animalsType.map((e, key) => {
                                                            return <option key={key} value={e.id}>{e.name}</option>;
                                                        })}
                                                    </select>
                                                </label>
                                            </div>
                                        </div>


                                        <div className="row m3">
                                            {this.state.announce.equipments.name}
                                        </div>

                                        <div className={this.state.bookingBtnDisabled ? "small red-text" : "small red-text invisible"} role="alert">
                                            <p className="text-center">
                                                Choisissez votre type d'animaux et votre service
                                            </p>
                                        </div>

                                        <div className="text-center">
                                            <button type="button" className="btn btn-danger" data-toggle="modal"
                                                    data-target="#modalBooking"
                                                    disabled={this.state.bookingBtnDisabled}>
                                                Réserver
                                            </button>
                                        </div>


                                        <div className="modal fade" id="modalBooking" tabIndex="-1" role="dialog"
                                             aria-labelledby="modalBooking"
                                             aria-hidden="true">

                                            <div className="modal-dialog modal-dialog-centered" role="document">


                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title"
                                                            id="bookingModalLongTitle">Réservation</h5>
                                                        <button type="button" className="close" data-dismiss="modal"
                                                                aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <BookingCalendar service={this.state.servicesChoice} announce={this.state.announce}/>
                                                            </div>
                                                        </div>

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

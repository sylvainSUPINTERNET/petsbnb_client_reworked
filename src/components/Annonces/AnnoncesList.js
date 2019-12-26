import React from 'react';

import Api from '../../api/index';

import Footer from '../../components/Partials/Footer';

import {withRouter} from "react-router-dom";


import QueryParams from '../../services/QueryParams';


class AnnoncesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "",
            announces: []

        };
    }

    componentDidMount() {
        let objQueryParams = QueryParams.getQueryParams(this.props.location.search);
        this.props.history.push(`/annonces${QueryParams.buildQueryAnnouncesList(objQueryParams)}`);

        Api
            .Announces
            .list(QueryParams.buildQueryAnnouncesList(objQueryParams))
            .then( (res) => {
                if(res.status === 200) {
                    this.setState({
                        announces : res.data.content
                    });
                } else {
                    // TODO error API
                    console.log("TODO -> display error")
                }

            })
            .catch( err => console.log(err)); // todo

        //console.log(QueryParams.getQueryParams(this.props.location.search))
        //QueryParams.announcesPageOnly(QueryParams.getQueryParams(this.props.location.search));
        //history.push(`/announces?page=${}`)


        /*
        Api
            .Services
            .list()
            .then((res) => {
                this.setServices(res.data);
            })
            .catch(err => console.log(err))
            */

    }

    render() {
        return (
            <div>
                <div className="container white darken-4 rounded-1 p-4 mt-2">

                    {JSON.stringify(this.state.announces)}
                    <div className="row">

                        <div className="col-md-3 p-1 mt-1">


                            <div className="card card-cascade">
                                <div className="view view-cascade overlay">
                                    <img className="card-img-top"
                                         src="https://mdbootstrap.com/img/Photos/Others/men.jpg"
                                         alt="Card image cap"/>
                                    <a>
                                        <div className="mask rgba-white-slight"></div>
                                    </a>
                                </div>
                                <div className="card-body card-body-cascade text-center">
                                    <h4 className="card-title"><strong>Billy Coleman</strong></h4>
                                    <h6 className="font-weight-bold indigo-text py-2">Web developer</h6>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Voluptatibus, ex, recusandae. Facere modi sunt, quod quibusdam.
                                    </p>
                                    <a type="button" className="btn-floating btn-small btn-fb"><i
                                        className="fab fa-facebook-f"></i></a>
                                    <a type="button" className="btn-floating btn-small btn-tw"><i
                                        className="fab fa-twitter"></i></a>
                                    <a type="button" className="btn-floating btn-small btn-dribbble"><i
                                        className="fab fa-dribbble"></i></a>
                                </div>
                                <div className="card-footer text-muted text-center">
                                    2 days ago
                                </div>
                            </div>


                        </div>


                        <div className="col-md-3 p-1 mt-1">


                            <div className="card card-cascade">
                                <div className="view view-cascade overlay">
                                    <img className="card-img-top"
                                         src="https://mdbootstrap.com/img/Photos/Others/men.jpg"
                                         alt="Card image cap"/>
                                    <a>
                                        <div className="mask rgba-white-slight"></div>
                                    </a>
                                </div>
                                <div className="card-body card-body-cascade text-center">
                                    <h4 className="card-title"><strong>Billy Coleman</strong></h4>
                                    <h6 className="font-weight-bold indigo-text py-2">Web developer</h6>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Voluptatibus, ex, recusandae. Facere modi sunt, quod quibusdam.
                                    </p>
                                    <a type="button" className="btn-floating btn-small btn-fb"><i
                                        className="fab fa-facebook-f"></i></a>
                                    <a type="button" className="btn-floating btn-small btn-tw"><i
                                        className="fab fa-twitter"></i></a>
                                    <a type="button" className="btn-floating btn-small btn-dribbble"><i
                                        className="fab fa-dribbble"></i></a>
                                </div>
                                <div className="card-footer text-muted text-center">
                                    2 days ago
                                </div>
                            </div>


                        </div>


                        <div className="col-md-3 p-1 mt-1">


                            <div className="card card-cascade">
                                <div className="view view-cascade overlay">
                                    <img className="card-img-top"
                                         src="https://mdbootstrap.com/img/Photos/Others/men.jpg"
                                         alt="Card image cap"/>
                                    <a>
                                        <div className="mask rgba-white-slight"></div>
                                    </a>
                                </div>
                                <div className="card-body card-body-cascade text-center">
                                    <h4 className="card-title"><strong>Billy Coleman</strong></h4>
                                    <h6 className="font-weight-bold indigo-text py-2">Web developer</h6>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Voluptatibus, ex, recusandae. Facere modi sunt, quod quibusdam.
                                    </p>
                                    <a type="button" className="btn-floating btn-small btn-fb"><i
                                        className="fab fa-facebook-f"></i></a>
                                    <a type="button" className="btn-floating btn-small btn-tw"><i
                                        className="fab fa-twitter"></i></a>
                                    <a type="button" className="btn-floating btn-small btn-dribbble"><i
                                        className="fab fa-dribbble"></i></a>
                                </div>
                                <div className="card-footer text-muted text-center">
                                    2 days ago
                                </div>
                            </div>


                        </div>

                        <div className="col-md-3 p-1 mt-1   ">


                            <div className="card card-cascade">
                                <div className="view view-cascade overlay">
                                    <img className="card-img-top"
                                         src="https://mdbootstrap.com/img/Photos/Others/men.jpg"
                                         alt="Card image cap"/>
                                    <a>
                                        <div className="mask rgba-white-slight"></div>
                                    </a>
                                </div>
                                <div className="card-body card-body-cascade text-center">
                                    <h4 className="card-title"><strong>Billy Coleman</strong></h4>
                                    <h6 className="font-weight-bold indigo-text py-2">Web developer</h6>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Voluptatibus, ex, recusandae. Facere modi sunt, quod quibusdam.
                                    </p>
                                    <a type="button" className="btn-floating btn-small btn-fb"><i
                                        className="fab fa-facebook-f"></i></a>
                                    <a type="button" className="btn-floating btn-small btn-tw"><i
                                        className="fab fa-twitter"></i></a>
                                    <a type="button" className="btn-floating btn-small btn-dribbble"><i
                                        className="fab fa-dribbble"></i></a>
                                </div>
                                <div className="card-footer text-muted text-center">
                                    2 days ago
                                </div>
                            </div>


                        </div>


                        <div className="col-md-3">


                            <div className="card card-cascade">
                                <div className="view view-cascade overlay">
                                    <img className="card-img-top"
                                         src="https://mdbootstrap.com/img/Photos/Others/men.jpg"
                                         alt="Card image cap"/>
                                    <a>
                                        <div className="mask rgba-white-slight"></div>
                                    </a>
                                </div>
                                <div className="card-body card-body-cascade text-center">
                                    <h4 className="card-title"><strong>Billy Coleman</strong></h4>
                                    <h6 className="font-weight-bold indigo-text py-2">Web developer</h6>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Voluptatibus, ex, recusandae. Facere modi sunt, quod quibusdam.
                                    </p>
                                    <a type="button" className="btn-floating btn-small btn-fb"><i
                                        className="fab fa-facebook-f"></i></a>
                                    <a type="button" className="btn-floating btn-small btn-tw"><i
                                        className="fab fa-twitter"></i></a>
                                    <a type="button" className="btn-floating btn-small btn-dribbble"><i
                                        className="fab fa-dribbble"></i></a>
                                </div>
                                <div className="card-footer text-muted text-center">
                                    2 days ago
                                </div>
                            </div>


                        </div>


                    </div>


                    <nav aria-label="Page navigation example">
                        <ul className="pagination pg-blue">
                            <li className="page-item">
                                <a className="page-link" tabIndex="-1">Previous</a>
                            </li>
                            <li className="page-item"><a className="page-link">1</a></li>
                            <li className="page-item active">
                                <a className="page-link">2 <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="page-item"><a className="page-link">3</a></li>
                            <li className="page-item ">
                                <a className="page-link">Next</a>
                            </li>
                        </ul>
                    </nav>


                </div>

                <Footer></Footer>
            </div>

        )
    }
}




export default withRouter(AnnoncesList);

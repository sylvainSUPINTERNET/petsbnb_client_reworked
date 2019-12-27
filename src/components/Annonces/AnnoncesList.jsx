import React from 'react';

import Api from '../../api/index';

import Footer from '../../components/Partials/Footer';

import {withRouter} from "react-router-dom";


import QueryParams from '../../services/QueryParams';

import Pagination from "react-bootstrap/Pagination";
import ReactPaginate from 'react-paginate';


class AnnoncesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            numberOfElements: 0,
            totalPages :0,
            announces: [],

        };
    }

    componentDidMount() {
        let objQueryParams = QueryParams.getQueryParams(this.props.location.search);
        this.props.history.push(`/annonces${QueryParams.buildQueryAnnouncesList(objQueryParams)}`);

        Api
            .Announces
            .list(QueryParams.buildQueryAnnouncesList(objQueryParams))
            .then((res) => {

                if (res.status === 200) {
                    this.setState({
                        announces: res.data.content,
                        currentPage: res.data.pageable.pageNumber + 1,
                        numberOfElements: res.data.pageable.pageSize,
                        totalPages: res.data.totalPages

                    });
                } else {
                    // TODO error API
                    console.log("TODO -> display error")
                }

            })
            .catch(err => console.log(err)); // todo
    }


    handlePageClick = data => {
        let selected = data.selected; // Beware, correspond to page clicked - 1 (to match with pagination api)

        this.setState({
            currentPage: selected
        });
        console.log("CURRENT PAGE", this.state.currentPage)

        //let objQueryParams = QueryParams.getQueryParams(this.props.location.search);
        //objQueryParams["page"] = this.state.currentPage;
        //this.props.history.push(`/annonces${QueryParams.buildQueryAnnouncesList(objQueryParams)}`);

        // TODO -> update query param
        // TODO -> update currentPage
        // TODO -> update list (call API with pagination updatezd);
        console.log("SELECTED", selected);
//        let offset = Math.ceil(selected * this.props.perPage);

  //      this.setState({ offset: offset }, () => {
    //        this.loadCommentsFromServer();
      //  });
    };

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

                    {this.state.totalPages}
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.totalPages}
                        marginPagesDisplayed={this.state.numberOfElements}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />

                </div>


                <Footer></Footer>
            </div>

        )
    }
}


export default withRouter(AnnoncesList);

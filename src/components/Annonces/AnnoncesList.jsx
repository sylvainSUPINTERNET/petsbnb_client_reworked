import React from 'react';

import Api from '../../api/index';

import Footer from '../../components/Partials/Footer';

import {withRouter} from "react-router-dom";


import QueryParams from '../../services/QueryParams';
import ReactPaginate from 'react-paginate';

import {getLoadingText} from '../LoaderSettings';

import LoadingOverlay from 'react-loading-overlay';

import AnnouncesCard from '../Annonces/AnnouncesCard';

class AnnoncesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            numberOfElements: 0,
            totalPages: 0,
            announces: [],
            isLoading: true,
            delay: 1000
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
                        totalPages: res.data.totalPages,
                        isLoading: false

                    });
                } else {
                    this.setState({
                        isLoading: false
                    });
                    console.log("TODO -> display error")
                }

            })
            .catch(err => console.log(err)); // todo
    }


    handlePageClick = data => {
        // Beware, correspond to page clicked - 1 (to match with pagination api)
        this.state.currentPage = data.selected;
        this.setState({
            isLoading: true
        });

        let objQueryParams = QueryParams.getQueryParams(this.props.location.search);
        objQueryParams["page"] = this.state.currentPage;
        Api
            .Announces
            .list(QueryParams.buildQueryAnnouncesList(objQueryParams))
            .then(res => {
                setTimeout(() => {
                    if (res.status === 200) {
                        this.setState({
                            announces: res.data.content,
                            currentPage: res.data.pageable.pageNumber + 1,
                            numberOfElements: res.data.pageable.pageSize,
                            totalPages: res.data.totalPages,
                            isLoading: false

                        });
                        this.props.history.push(`/annonces${QueryParams.buildQueryAnnouncesList(objQueryParams)}`)

                    } else {
                        this.setState({
                            isLoading: false
                        });
                        console.log("TODO -> display error")
                    }
                }, this.state.delay);

            })
            .catch(err => console.log(err));
    };


    render() {
        if (this.state.announces.length > 0) {
            return (
                <div>
                    <LoadingOverlay
                        active={this.state.isLoading}
                        spinner
                        text={getLoadingText()}>
                        <div className="container white darken-4 rounded-1 p-4 mt-2">

                            {JSON.stringify(this.state.announces)}

                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="container darken-4 red">
                                        Filter
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="row">

                                        {this.state.announces.map((announce) =>

                                            <div className="col-md-3 p-1 mt-1">
                                                <AnnouncesCard announce={announce}/>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>


                            <div className="d-flex mt-3">
                                <ReactPaginate
                                    previousLabel={'précédent'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextLabel={'suivant'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    breakLabel={'...'}
                                    breakClassName={'page-item'}
                                    breakLinkClassName={'page-link'}
                                    pageCount={this.state.totalPages}
                                    marginPagesDisplayed={this.state.numberOfElements}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination pg-blue mx-auto'}
                                    pageLinkClassName={'page-link'}
                                    pageClassName={'page-item'}
                                    activeClassName={'active'}/>
                            </div>


                        </div>

                    </LoadingOverlay>


                    <Footer></Footer>

                </div>

            )
        } else {
            return (
                <div>
                    <LoadingOverlay
                        active={this.state.isLoading}
                        spinner
                        text={getLoadingText()}>
                        <div className="container white darken-4 rounded-1 p-4 mt-2">

                            {JSON.stringify(this.state.announces)}

                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="container darken-4 red">
                                        Filter
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="row">

                                        <div className="alert alert-light" role="alert">
                                            Aucunes annonces pour cette recherche ...
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </LoadingOverlay>


                    <Footer></Footer>

                </div>
            )
        }

    }
}


export default withRouter(AnnoncesList);

import React from 'react';

import Api from '../../api/index';

import Footer from '../../components/Partials/Footer';

import {withRouter} from "react-router-dom";


import QueryParams from '../../services/QueryParams';
import ReactPaginate from 'react-paginate';

import {getLoadingText} from '../LoaderSettings';

import LoadingOverlay from 'react-loading-overlay';

import AnnouncesCard from '../Annonces/AnnouncesCard';
import {Form, Row} from "react-bootstrap";



class AnnoncesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            numberOfElements: 0,
            totalPages: 0,
            announces: [],
            isLoading: true,
            delay: 1000,

            // fields
            departmentChoiceName : "",



            // search button
            searchBtnLoaderDisplay: false,
            searchBtnDisabled: false,
            timerRedirectionSearchBtn: 800,

        };

        this.onClickSearchBtn = this.onClickSearchBtn.bind(this);
        this.setDefaultValueForFields = this.setDefaultValueForFields.bind(this);
        this.generateQueryParamsUrlForRedirection = this.generateQueryParamsUrlForRedirection.bind(this);
        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
        this.getAnnouncesList = this.getAnnouncesList.bind(this);
    }


    componentDidMount() {
        let objQueryParams = QueryParams.getQueryParams(this.props.location.search);
        this.props.history.push(`/annonces${QueryParams.buildQueryAnnouncesList(objQueryParams)}`);
        console.log("query params : " , objQueryParams);

        this.getAnnouncesList(objQueryParams, false, true);

        this.setDefaultValueForFields(objQueryParams);
    }

    async getAnnouncesList(objQueryParams, refresh, init){

        if(init === true) {
            this.setState({
                searchBtnLoaderDisplay: false,
                searchBtnDisabled: true,
                isLoading: true
            });
        }

        if(refresh === true){
            this.setState({
                searchBtnLoaderDisplay: true,
                searchBtnDisabled: true,
                isLoading: true
            });
        }

        try {
            const res = await Api.Announces.list(QueryParams.buildQueryAnnouncesList(objQueryParams));

            setTimeout(() => {
                if (res.status === 200) {
                    this.setState({
                        announces: res.data.content,
                        currentPage: res.data.pageable.pageNumber + 1,
                        numberOfElements: res.data.pageable.pageSize,
                        totalPages: res.data.totalPages,
                        isLoading: false,
                        searchBtnLoaderDisplay: false,
                        searchBtnDisabled: false,

                    });
                    this.props.history.push(`/annonces${QueryParams.buildQueryAnnouncesList(objQueryParams)}`)

                } else {
                    this.setState({
                        isLoading: false
                    });
                    console.log("TODO -> display error")
                }
            }, this.state.delay);

        } catch (e) {
            console.log(e);
        }
    }


    setDefaultValueForFields = (objQueryParams) => {
        let department = objQueryParams["department"] ? objQueryParams["department"] : 'Départment' ;

        if(department) {
            this.setState({
                departmentChoiceName: department
            });
        }
        // TODO -> get query params
        // TODO -> check si il on present , si oui on set par default la valeur dans le champs correspondant
    };

    generateQueryParamsUrlForRedirection(){

        if(this.state.servicesChoiceId === "" && this.state.animalsTypeChoiceId === "" && this.state.departmentChoiceName === ""){
            return "/annonces?page=0"; // only pagination and full list
        } else {
            let url = "/annonces?page=0";

            if(this.state.servicesChoiceId){
                url += `&services=${this.state.servicesChoiceId}`
            }

            if(this.state.animalsTypeChoiceId){
                url += `&animals=${this.state.animalsTypeChoiceId}`
            }

            if(this.state.departmentChoiceName){
                url += `&department=${this.state.departmentChoiceName}`
            }

            return url;
        }
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

    handleChangeDepartment(event) {
        this.setState({departmentChoiceName: event.target.value});
    }

    onClickSearchBtn() {
        console.log("SARCH");
        console.log(this.state);
        console.log(this.generateQueryParamsUrlForRedirection());
        this.setState({
            searchBtnLoaderDisplay: true,
            searchBtnDisabled: true,
            isLoading: true
        });
        setTimeout(() => {
            this.props.history.push(this.generateQueryParamsUrlForRedirection());

            // GET NEW query params setted
            let objQueryParams = QueryParams.getQueryParams(this.props.location.search);
            this.getAnnouncesList(objQueryParams, true, false);
        }, this.state.timerRedirectionSearchBtn);
    }




    render() {
        if (this.state.announces.length > 0) {
            return (
                <div>
                    <LoadingOverlay
                        active={this.state.isLoading}
                        spinner
                        text={getLoadingText()}>
                        <div className="container white darken-4 rounded-1 p-4 mt-2">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 mt-2">

                                    <div className="grid-item col-md-12 mb-4">
                                        <div className="card">
                                            <div className="card-header text-center">
                                                Filtres
                                            </div>
                                            <div className="card-body">
                                                <Form>
                                                    <Row>
                                                        <div className="input-group mb-3 col-md-12">
                                                            <select value={this.state.departmentChoiceName}
                                                                    onChange={this.handleChangeDepartment}
                                                                    defaultValue={"default_dept"}
                                                                    className="custom-select"
                                                                    id="inputGroupSelect01">
                                                                <option value="default_dept">Département</option>
                                                                <option value="01">01 - Ain</option>
                                                                <option value="02">02 - Aisne</option>
                                                                <option value="03">03 - Allier</option>
                                                                <option value="04">04 - Alpes de Haute Provence</option>
                                                                <option value="05">05 - Hautes Alpes</option>
                                                                <option value="06">06 - Alpes Maritimes</option>
                                                                <option value="07">07 - Ardèche</option>
                                                                <option value="08">08 - Ardennes</option>
                                                                <option value="09">09 - Ariège</option>
                                                                <option value="10">10 - Aube</option>
                                                                <option value="11">11 - Aude</option>
                                                                <option value="12">12 - Aveyron</option>
                                                                <option value="13">13 - Bouches du Rhône</option>
                                                                <option value="14">14 - Calvados</option>
                                                                <option value="15">15 - Cantal</option>
                                                                <option value="16">16 - Charente</option>
                                                                <option value="17">17 - Charente Maritime</option>
                                                                <option value="18">18 - Cher</option>
                                                                <option value="19">19 - Corrèze</option>
                                                                <option value="2A">2A - Corse du Sud</option>
                                                                <option value="2B">2B - Haute-Corse</option>
                                                                <option value="21">21 - Côte d'Or</option>
                                                                <option value="22">22 - Côtes d'Armor</option>
                                                                <option value="23">23 - Creuse</option>
                                                                <option value="24">24 - Dordogne</option>
                                                                <option value="25">25 - Doubs</option>
                                                                <option value="26">26 - Drôme</option>
                                                                <option value="27">27 - Eure</option>
                                                                <option value="28">28 - Eure et Loir</option>
                                                                <option value="29">29 - Finistère</option>
                                                                <option value="30">30 - Gard</option>
                                                                <option value="31">31 - Haute Garonne</option>
                                                                <option value="32">32 - Gers</option>
                                                                <option value="33">33 - Gironde</option>
                                                                <option value="34">34 - Hérault</option>
                                                                <option value="35">35 - Ille et Vilaine</option>
                                                                <option value="36">36 - Indre</option>
                                                                <option value="37">37 - Indre et Loire</option>
                                                                <option value="38">38 - Isère</option>
                                                                <option value="39">39 - Jura</option>
                                                                <option value="40">40 - Landes</option>
                                                                <option value="41">41 - Loir et Cher</option>
                                                                <option value="42">42 - Loire</option>
                                                                <option value="43">43 - Haute Loire</option>
                                                                <option value="44">44 - Loire Atlantique</option>
                                                                <option value="45">45 - Loiret</option>
                                                                <option value="46">46 - Lot</option>
                                                                <option value="47">47 - Lot et Garonne</option>
                                                                <option value="48">48 - Lozère</option>
                                                                <option value="49">49 - Maine et Loire</option>
                                                                <option value="50">50 - Manche</option>
                                                                <option value="51">51 - Marne</option>
                                                                <option value="52">52 - Haute Marne</option>
                                                                <option value="53">53 - Mayenne</option>
                                                                <option value="54">54 - Meurthe et Moselle</option>
                                                                <option value="55">55 - Meuse</option>
                                                                <option value="56">56 - Morbihan</option>
                                                                <option value="57">57 - Moselle</option>
                                                                <option value="58">58 - Nièvre</option>
                                                                <option value="59">59 - Nord</option>
                                                                <option value="60">60 - Oise</option>
                                                                <option value="61">61 - Orne</option>
                                                                <option value="62">62 - Pas de Calais</option>
                                                                <option value="63">63 - Puy de Dôme</option>
                                                                <option value="64">64 - Pyrénées Atlantiques</option>
                                                                <option value="65">65 - Hautes Pyrénées</option>
                                                                <option value="66">66 - Pyrénées Orientales</option>
                                                                <option value="67">67 - Bas Rhin</option>
                                                                <option value="68">68 - Haut Rhin</option>
                                                                <option value="69">69 - Rhône</option>
                                                                <option value="70">70 - Haute Saône</option>
                                                                <option value="71">71 - Saône et Loire</option>
                                                                <option value="72">72 - Sarthe</option>
                                                                <option value="73">73 - Savoie</option>
                                                                <option value="74">74 - Haute Savoie</option>
                                                                <option value="75">75 - Paris</option>
                                                                <option value="76">76 - Seine Maritime</option>
                                                                <option value="77">77 - Seine et Marne</option>
                                                                <option value="78">78 - Yvelines</option>
                                                                <option value="79">79 - Deux Sèvres</option>
                                                                <option value="80">80 - Somme</option>
                                                                <option value="81">81 - Tarn</option>
                                                                <option value="82">82 - Tarn et Garonne</option>
                                                                <option value="83">83 - Var</option>
                                                                <option value="84">84 - Vaucluse</option>
                                                                <option value="85">85 - Vendée</option>
                                                                <option value="86">86 - Vienne</option>
                                                                <option value="87">87 - Haute Vienne</option>
                                                                <option value="88">88 - Vosges</option>
                                                                <option value="89">89 - Yonne</option>
                                                                <option value="90">90 - Territoire de Belfort</option>
                                                                <option value="91">91 - Essonne</option>
                                                                <option value="92">92 - Hauts de Seine</option>
                                                                <option value="93">93 - Seine Saint Denis</option>
                                                                <option value="94">94 - Val de Marne</option>
                                                                <option value="95">95 - Val d'Oise</option>
                                                                <option value="971">971 - Guadeloupe</option>
                                                                <option value="972">972 - Martinique</option>
                                                                <option value="973">973 - Guyane</option>
                                                                <option value="974">974 - Réunion</option>
                                                                <option value="975">975 - Saint Pierre et Miquelon
                                                                </option>
                                                                <option value="976">976 - Mayotte</option>
                                                            </select>
                                                            <div className="input-group-append">
                                                                <label
                                                                    className="input-group-text blue darken-4 text-white"
                                                                    htmlFor="inputGroupSelect02"><i
                                                                    className="fa fa-map-pin"></i></label>
                                                            </div>
                                                        </div>


                                                    </Row>
                                                </Form>


                                                <div className="row">
                                                    <div className="col text-center mt-3 py-2">
                                                        <button className="btn btn-primary btn-md btn-success"
                                                                type="button"
                                                                onClick={this.onClickSearchBtn}
                                                                disabled={this.state.searchBtnDisabled}>
                                            <span
                                                style={{display: this.state.searchBtnLoaderDisplay ? 'inline-block' : 'none'}}
                                                className="spinner-border spinner-border-sm mr-2"
                                                role="status"
                                                aria-hidden="true"></span>
                                                            Rechercher
                                                        </button>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
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
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="grid-item col-md-12 mb-4">
                                        <div className="card">
                                            <div className="card-header text-center">
                                                Filtres
                                            </div>
                                            <div className="card-body">
                                                <Form>
                                                    <Row>
                                                        <div className="input-group mb-3 col-md-12">
                                                            <select value={this.state.departmentChoiceName}
                                                                    onChange={this.handleChangeDepartment}
                                                                    defaultValue={"default_dept"}
                                                                    className="custom-select"
                                                                    id="inputGroupSelect01">
                                                                <option value="default_dept">Département</option>
                                                                <option value="01">01 - Ain</option>
                                                                <option value="02">02 - Aisne</option>
                                                                <option value="03">03 - Allier</option>
                                                                <option value="04">04 - Alpes de Haute Provence</option>
                                                                <option value="05">05 - Hautes Alpes</option>
                                                                <option value="06">06 - Alpes Maritimes</option>
                                                                <option value="07">07 - Ardèche</option>
                                                                <option value="08">08 - Ardennes</option>
                                                                <option value="09">09 - Ariège</option>
                                                                <option value="10">10 - Aube</option>
                                                                <option value="11">11 - Aude</option>
                                                                <option value="12">12 - Aveyron</option>
                                                                <option value="13">13 - Bouches du Rhône</option>
                                                                <option value="14">14 - Calvados</option>
                                                                <option value="15">15 - Cantal</option>
                                                                <option value="16">16 - Charente</option>
                                                                <option value="17">17 - Charente Maritime</option>
                                                                <option value="18">18 - Cher</option>
                                                                <option value="19">19 - Corrèze</option>
                                                                <option value="2A">2A - Corse du Sud</option>
                                                                <option value="2B">2B - Haute-Corse</option>
                                                                <option value="21">21 - Côte d'Or</option>
                                                                <option value="22">22 - Côtes d'Armor</option>
                                                                <option value="23">23 - Creuse</option>
                                                                <option value="24">24 - Dordogne</option>
                                                                <option value="25">25 - Doubs</option>
                                                                <option value="26">26 - Drôme</option>
                                                                <option value="27">27 - Eure</option>
                                                                <option value="28">28 - Eure et Loir</option>
                                                                <option value="29">29 - Finistère</option>
                                                                <option value="30">30 - Gard</option>
                                                                <option value="31">31 - Haute Garonne</option>
                                                                <option value="32">32 - Gers</option>
                                                                <option value="33">33 - Gironde</option>
                                                                <option value="34">34 - Hérault</option>
                                                                <option value="35">35 - Ille et Vilaine</option>
                                                                <option value="36">36 - Indre</option>
                                                                <option value="37">37 - Indre et Loire</option>
                                                                <option value="38">38 - Isère</option>
                                                                <option value="39">39 - Jura</option>
                                                                <option value="40">40 - Landes</option>
                                                                <option value="41">41 - Loir et Cher</option>
                                                                <option value="42">42 - Loire</option>
                                                                <option value="43">43 - Haute Loire</option>
                                                                <option value="44">44 - Loire Atlantique</option>
                                                                <option value="45">45 - Loiret</option>
                                                                <option value="46">46 - Lot</option>
                                                                <option value="47">47 - Lot et Garonne</option>
                                                                <option value="48">48 - Lozère</option>
                                                                <option value="49">49 - Maine et Loire</option>
                                                                <option value="50">50 - Manche</option>
                                                                <option value="51">51 - Marne</option>
                                                                <option value="52">52 - Haute Marne</option>
                                                                <option value="53">53 - Mayenne</option>
                                                                <option value="54">54 - Meurthe et Moselle</option>
                                                                <option value="55">55 - Meuse</option>
                                                                <option value="56">56 - Morbihan</option>
                                                                <option value="57">57 - Moselle</option>
                                                                <option value="58">58 - Nièvre</option>
                                                                <option value="59">59 - Nord</option>
                                                                <option value="60">60 - Oise</option>
                                                                <option value="61">61 - Orne</option>
                                                                <option value="62">62 - Pas de Calais</option>
                                                                <option value="63">63 - Puy de Dôme</option>
                                                                <option value="64">64 - Pyrénées Atlantiques</option>
                                                                <option value="65">65 - Hautes Pyrénées</option>
                                                                <option value="66">66 - Pyrénées Orientales</option>
                                                                <option value="67">67 - Bas Rhin</option>
                                                                <option value="68">68 - Haut Rhin</option>
                                                                <option value="69">69 - Rhône</option>
                                                                <option value="70">70 - Haute Saône</option>
                                                                <option value="71">71 - Saône et Loire</option>
                                                                <option value="72">72 - Sarthe</option>
                                                                <option value="73">73 - Savoie</option>
                                                                <option value="74">74 - Haute Savoie</option>
                                                                <option value="75">75 - Paris</option>
                                                                <option value="76">76 - Seine Maritime</option>
                                                                <option value="77">77 - Seine et Marne</option>
                                                                <option value="78">78 - Yvelines</option>
                                                                <option value="79">79 - Deux Sèvres</option>
                                                                <option value="80">80 - Somme</option>
                                                                <option value="81">81 - Tarn</option>
                                                                <option value="82">82 - Tarn et Garonne</option>
                                                                <option value="83">83 - Var</option>
                                                                <option value="84">84 - Vaucluse</option>
                                                                <option value="85">85 - Vendée</option>
                                                                <option value="86">86 - Vienne</option>
                                                                <option value="87">87 - Haute Vienne</option>
                                                                <option value="88">88 - Vosges</option>
                                                                <option value="89">89 - Yonne</option>
                                                                <option value="90">90 - Territoire de Belfort</option>
                                                                <option value="91">91 - Essonne</option>
                                                                <option value="92">92 - Hauts de Seine</option>
                                                                <option value="93">93 - Seine Saint Denis</option>
                                                                <option value="94">94 - Val de Marne</option>
                                                                <option value="95">95 - Val d'Oise</option>
                                                                <option value="971">971 - Guadeloupe</option>
                                                                <option value="972">972 - Martinique</option>
                                                                <option value="973">973 - Guyane</option>
                                                                <option value="974">974 - Réunion</option>
                                                                <option value="975">975 - Saint Pierre et Miquelon
                                                                </option>
                                                                <option value="976">976 - Mayotte</option>
                                                            </select>
                                                            <div className="input-group-append">
                                                                <label
                                                                    className="input-group-text blue darken-4 text-white"
                                                                    htmlFor="inputGroupSelect02"><i
                                                                    className="fa fa-map-pin"></i></label>
                                                            </div>
                                                        </div>


                                                    </Row>
                                                </Form>


                                                <div className="row">
                                                    <div className="col text-center mt-3 py-2">
                                                        <button className="btn btn-primary btn-md btn-success"
                                                                type="button"
                                                                onClick={this.onClickSearchBtn}
                                                                disabled={this.state.searchBtnDisabled}>
                                            <span
                                                style={{display: this.state.searchBtnLoaderDisplay ? 'inline-block' : 'none'}}
                                                className="spinner-border spinner-border-sm mr-2"
                                                role="status"
                                                aria-hidden="true"></span>
                                                            Rechercher
                                                        </button>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="row">

                                        <div className="alert alert-light" role="alert">
                                            <p className="text-center">Aucunes annonces pour cette recherche ...</p>
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

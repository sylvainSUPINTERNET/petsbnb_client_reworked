'use strict';

import queryString from 'query-string';
import {object} from "prop-types";


/**
 * Use this in your component as param -> this.props.location.search (router react)
 * @param propsLocationSearch
 * @returns {*}
 */
const getQueryParams = (propsLocationSearch) => {
    return queryString.parse(propsLocationSearch);
};


const buildQueryAnnouncesList = (objQueryParams) => {
    let paramsStr = "?"; // begin
    let separator = "&"; // at the beginning of each params AFTER page

    /**
     * Accepted params in query for announces list
     * @type {{services: {default: boolean, type: string}, department: {default: boolean, type: string}, animalsType: {default: boolean, type: string}}}
     */
    const whiteListParams = {
        services: {
            type: "number", // id
            default: false,
            name: "services"
        },
        animalsType: {
            type: "number", // id
            default: false,
            name:"animals"
        },
        department: {
            type: "string",
            default: false,
            name: "department"
        }
    };

    if (!objQueryParams["page"] || isNaN(objQueryParams["page"])) {
        paramsStr += "page=0";
    } else {
        paramsStr += `page=${objQueryParams["page"]}`
    }

     if(objQueryParams[whiteListParams.services.name] && !isNaN(objQueryParams[whiteListParams.services.name])) {
        paramsStr += `${separator}${whiteListParams.services.name}=${objQueryParams[whiteListParams.services.name]}`;
     }

     if(objQueryParams[whiteListParams.animalsType.name] && !isNaN(objQueryParams[whiteListParams.animalsType.name])){
         paramsStr += `${separator}${whiteListParams.animalsType.name}=${objQueryParams[whiteListParams.animalsType.name]}`
     }

     if(objQueryParams[whiteListParams.department.name] && !isNaN(objQueryParams[whiteListParams.department.name])){
         paramsStr += `${separator}${whiteListParams.department.name}=${objQueryParams[whiteListParams.department.name]}`
     }

    return paramsStr
};


const isValidQueryParams = (whiteListParams, parma) => {

};
export default {
    getQueryParams: getQueryParams,
    buildQueryAnnouncesList: buildQueryAnnouncesList
}



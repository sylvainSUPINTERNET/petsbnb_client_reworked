'use strict';

import queryString from 'query-string';


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
            default: false
        },
        animalsType: {
            type: "number", // id
            default: false
        },
        department: {
            type: "string",
            default: false
        }
    };

    if (!objQueryParams["page"] || isNaN(objQueryParams["page"])) {
        paramsStr += "page=0";
    } else {
        paramsStr += `page=${objQueryParams["page"]}`
    }

    // TODO other params here (dont forget to add & before after page has be setted
    // TODO use generic method isValidQueryParams

    return paramsStr;
};


const isValidQueryParams = (whiteListParams, parma) => {

};
export default {
    getQueryParams: getQueryParams,
    buildQueryAnnouncesList: buildQueryAnnouncesList
}



'use strict';


/**
 * Return JWT from localStorage
 * @returns {string}
 */
let getAccessToken = () => {
    return localStorage.getItem("accessToken");

};



export default {
    getAccessToken : getAccessToken
}

'use strict';

import axios from 'axios';

import TokenService from '../../services/JwtService';

import {apiEndpoints} from "../config";

let search = async (params) => {

    return await axios.get(`${apiEndpoints.announcesSearchProxy}${params}`, {
        headers: {'Authorization': "Bearer " + TokenService.getAccessToken()}
    })
};


let get = async (uuid) => {

    return await axios.get(`${apiEndpoints.announceProfileProxy}/${uuid}`, {
        headers: {'Authorization': 'Bearer ' + TokenService.getAccessToken()}
    })
};


const Announces = {
    list: search,
    getOne: get
};


export default Announces;

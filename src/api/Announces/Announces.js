'use strict';

import axios from 'axios';

import TokenService from '../../services/JwtService';

import {apiEndpoints} from "../config";

let search = async (params) => {

    return await axios.get(`${apiEndpoints.announcesSearchProxy}${params}`, {
        headers: {'Authorization': "Bearer " + TokenService.getAccessToken()}
    })
};


const AnimalsType = {
    list: search
};


export default AnimalsType;

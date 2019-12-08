'use strict';

import axios from 'axios';

import TokenService from '../../services/JwtService';

import {apiEndpoints} from "../config";

let getAll = async () => {
    return await axios.get(`${apiEndpoints.animalsTypeProxy}`, {
        headers: {'Authorization': "Bearer " + TokenService.getAccessToken()}
    })
};


const AnimalsType = {
    list: getAll
};


export default AnimalsType;

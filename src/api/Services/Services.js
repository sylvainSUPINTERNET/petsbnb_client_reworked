import axios from 'axios';

import TokenService from '../../services/JwtService';

import {apiEndpoints} from "../config";


let getAll = async () => {
    return await axios.get(`${apiEndpoints.servicesProxy}`, {
        headers: {'Authorization': "Bearer " + TokenService.getAccessToken()}
    })
};


const Services = {
    list: getAll
};


export default Services;


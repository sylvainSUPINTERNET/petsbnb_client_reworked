import axios from 'axios';

import TokenService from '../../services/JwtService';

import {apiEndpoints} from "../config";

/**
 * Retrieve data for one user related to the JWT present in header
 * @returns {Promise<void>}
 */
let me = async () => {
    return await
        axios.get(`${apiEndpoints.userMeProxy}/me`, {
            headers: {
                'Authorization': "Bearer " + TokenService.getAccessToken()
            }
        })
};


const User = {
    getMe: me
};


export default User;

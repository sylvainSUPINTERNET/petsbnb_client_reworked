import axios from 'axios';

import {apiEndpoints} from "../config";

let login = async (data) => {
    return await axios.post(`${apiEndpoints.loginProxy}`, data, {})
};


export default login;

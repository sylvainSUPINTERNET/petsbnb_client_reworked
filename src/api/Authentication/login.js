import axios from 'axios';

import {apiEndpoints} from "../config";

let login = async (data) => {
    return await axios.post(`${apiEndpoints.login}`, data, {})
};


export default login;
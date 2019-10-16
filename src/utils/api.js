import axios from 'axios';
import config from '../config/config';

const API = axios.create({
    baseURL : config.uri,
    headers : {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('authToken')
    }
});


export default API;
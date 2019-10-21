import axios from 'axios';
import config from '../config/config';

const API = axios.create({
    baseURL : config.uri,
});


export default API;
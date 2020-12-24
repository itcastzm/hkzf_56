import axios from 'axios';
import { BASE_URL } from './url';


const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    // headers: { 'X-Custom-Header': 'foobar' }
});


export default instance;
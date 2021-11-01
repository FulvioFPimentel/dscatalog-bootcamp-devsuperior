import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://fulvio-dscatalog.herokuapp.com'
})
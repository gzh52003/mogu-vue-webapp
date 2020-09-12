import axios from 'axios';

const source = axios.CancelToken.source();

const request = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/h8/',
    withCredentials: true,
});

request.source = source;

export default request;
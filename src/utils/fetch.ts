import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

console.log('API_URL', API_URL);
const fetch = axios.create({
  baseURL: API_URL,
  headers: {
    client_id: 'gatsu-web',
  },
});

export default fetch;

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
const user = localStorage['gatsu-user'];
const token = JSON.parse(user)['access_token'];
const fetch = axios.create({
  baseURL: API_URL,
  headers: {
    client_id: 'gatsu-web',
    Authorization: token,
  },
});

export default fetch;

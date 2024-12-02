import axios from 'axios';

const fetch = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    client_id: 'gatsu-web',
  },
});

export default fetch;

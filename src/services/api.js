import axios from 'axios';

export default axios.create({
  baseURL: 'https://apoio-a-caridade-api.herokuapp.com/api',
});

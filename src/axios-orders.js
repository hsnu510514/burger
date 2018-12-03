import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-18a73.firebaseio.com/'
})

export default instance;
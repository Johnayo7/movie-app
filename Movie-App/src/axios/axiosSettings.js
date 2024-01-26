import axioz from 'axios';

const axios = axioz.create({
  baseURL: 'http://ec2-54-82-52-93.compute-1.amazonaws.com:8080',
  // http://ec2-54-82-52-93.compute-1.amazonaws.com:8080
  // baseURL:  'http://localhost:3010/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axios;

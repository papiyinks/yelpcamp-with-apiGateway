import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://lqg8qardve.execute-api.us-east-1.amazonaws.com/dev',
});

// const instance = axios.create({
//   baseURL: 'https://papi-yelpcamp2.herokuapp.com',
// });

// const instance = axios.create({
//   baseURL: 'http://localhost:4000',
// });

export default instance;

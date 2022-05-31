import axios from 'axios';
import { devConsoleError, devConsoleLog } from './logging';

if (window.location.hostname === 'localhost') {
  axios.defaults.baseURL = 'http://localhost:4200/api';
} else {
  axios.defaults.baseURL = 'https://pwabook.herokuapp.com/api';
}

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    devConsoleLog(
      `REQUEST : ${config.url}\n\nJSON : ${JSON.stringify(config)}`
    );

    return config;
  },
  function (error) {
    // Do something with request error
    devConsoleLog(`API request error : ${JSON.stringify(error)}`);

    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    devConsoleLog(
      `[${response.status}] RESPONSE : ${
        response.config.url
      } \n\nJSON : ${JSON.stringify(response)}`
    );

    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      devConsoleError(`API response error : ${JSON.stringify(error.response)}`);
    } else {
      devConsoleError(`API response error : ${JSON.stringify(error)}`);
    }

    return Promise.reject({
      name: error.name,
      message: error.response?.data.Message,
      code: error.response?.status?.toString(),
      stack: error.stack,
    });
  }
);

export default axios;

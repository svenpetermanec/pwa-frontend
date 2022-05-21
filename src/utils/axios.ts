import axios from 'axios';

if (window.location.hostname === 'localhost') {
  axios.defaults.baseURL = 'http://localhost:4200/api';
} else {
  //axios.defaults.baseURL = "";
}

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(`REQUEST : ${config.url}\n\nJSON : ${JSON.stringify(config)}`);

    return config;
  },
  function (error) {
    // Do something with request error
    console.log(`API request error : ${JSON.stringify(error)}`);

    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log(
      `[${response.status}] RESPONSE : ${
        response.config.url
      } \n\nJSON : ${JSON.stringify(response)}`
    );

    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      console.error(`API response error : ${JSON.stringify(error.response)}`);
    } else {
      console.error(`API response error : ${JSON.stringify(error)}`);
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

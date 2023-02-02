import axiosDefault from 'axios';

const axios = axiosDefault.create();

axios.interceptors.response.use(
  (response) => response.data,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong!'
    )
);

export default axios;

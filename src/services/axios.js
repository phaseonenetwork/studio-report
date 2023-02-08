import axiosDefault from 'axios';
import routes from '../router';

const axios = axiosDefault.create({
  // baseURL: networkConfig.apiUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
  },
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error?.response?.status === 401) {
      routes.navigate('/login', { state: { redirected: true } });
    }

    throw error.response.data || new Error('Something went wrong!');
  }
);

export default axios;

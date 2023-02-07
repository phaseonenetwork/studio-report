import axios from './axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const SessionReportService = () => ({
  create: (values) => axios.post(`${BASE_URL}/session-reports/create`, values),
  finish: (values) => axios.post(`${BASE_URL}/session-reports/finish`, values),
  update: (values) => axios.patch(`${BASE_URL}/session-reports`, values),
  get: (id) => axios.get(`${BASE_URL}/session-reports/${id}`),
});

export default SessionReportService;

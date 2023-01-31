import client from 'axios';
import { apiUrl } from '../constants';

export const axios = client.create({
  baseURL: apiUrl,
});

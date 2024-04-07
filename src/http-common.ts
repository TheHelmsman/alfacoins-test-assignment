import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = globalThis.BACKEND_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: `${BACKEND_URL}`,
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export default apiClient;

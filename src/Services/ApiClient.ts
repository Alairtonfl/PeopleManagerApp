import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5258',
  withCredentials: true,
});

export default apiClient;

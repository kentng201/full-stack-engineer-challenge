import axios from 'axios';

export function api() {
  const API_HOST = process.env.API_HOST || 'http://localhost:8000';
  const client = axios.create({
    baseURL: API_HOST
  });
  client.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error),
  );
  return client;
}
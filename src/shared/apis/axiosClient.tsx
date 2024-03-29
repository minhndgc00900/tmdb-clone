import axios, { AxiosResponse } from 'axios';
import { showToast } from 'components/Toast';
import { ApiMethods } from 'shared/enums/api';

interface ErrorResponse {
  response: AxiosResponse;
}

const API_BASE_URL = process.env.REACT_APP_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'applications/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response.data;
  },
  (error) => {
    // Handle error responses
    const errorMessage = error.response?.data.message || 'An error occurred';
    showToast({
      message: errorMessage,
      type: 'error',
    });
    throw new Error(errorMessage);
  }
);

export async function makeApiRequest<T>(
  method: ApiMethods,
  path: string,
  body: object,
  config: object = {}
) {
  let res = null;
  switch (method) {
    case 'get':
      // in case GET method: body is config
      res = axiosInstance[method](path, body || config) as Promise<T>;
      break;
    default:
      res = axiosInstance[method](path, body, config) as Promise<T>;
  }

  return res
    .then((resp) => {
      return resp;
    })
    .catch(async (error: ErrorResponse) => {
      switch (error.response?.status) {
        case 400: // Wrong url or params
          break;
        case 500: // Server error
          break;
        default:
          throw error.response.data;
      }
      throw error.response.data;
    });
}

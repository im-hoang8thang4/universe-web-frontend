import axios, { AxiosResponse } from 'axios';
import { ITokens } from '../interfaces';

// Response types

export enum AXIOS_RESPONSE_TYPE {
  SUCCESS,
  ERROR,
  AXIOS_RESPONSE_TYPE,
}

export interface IAxiosResponse extends AxiosResponse {
  type: AXIOS_RESPONSE_TYPE;
  data: any;
}

const onSuccess = (res: any) => {
  return {
    type: AXIOS_RESPONSE_TYPE.SUCCESS,
    data: res.data,
  };
};

const onError = (err: any) => {
  const unknownError = {
    error: 'Internal Server Error',
    message: 'Something went wrong',
    statusCode: 500,
  };
  return {
    type: AXIOS_RESPONSE_TYPE.ERROR,
    data: err.response.data || unknownError,
  };
};

export const refreshToken = async (refresh_token: string): Promise<ITokens> => {
  const tokens = await axios.post(process.env.REACT_APP_API_BASE_URL + 'auth/refresh-token', {
    refreshToken: refresh_token,
    redirectUri: window.location.origin,
  });
  tokens.data.expires_in = Date.now() + (tokens.data.expires_in as number) * 1000;
  tokens.data.refresh_expires_in = Date.now() + (tokens.data.refresh_expires_in as number) * 1000;
  localStorage.setItem('tokens', JSON.stringify(tokens.data));
  return tokens.data as ITokens;
};

const request = axios.create();

// Configure axios
request.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
request.interceptors.response.use(onSuccess, onError);
request.interceptors.request.use(async (config: any) => {
  let localTokens = JSON.parse(localStorage.getItem('tokens') || '{}') as ITokens;
  if (localTokens.refresh_expires_in < Date.now()) {
    localStorage.removeItem('tokens');
    window.location.replace('/login');
  }
  if (localTokens.expires_in < Date.now()) {
    try {
      localTokens = await refreshToken(localTokens.refresh_token);
      localStorage.setItem('tokens', JSON.stringify(localTokens));
    } catch (error) {
      localStorage.removeItem('tokens');
      window.location.replace('/login');
    }
  }
  config.headers.Authorization = `Bearer ${localTokens.access_token}`;
  return config;
});

export { request };

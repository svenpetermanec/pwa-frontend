import { AxiosRequestConfig } from 'axios';
import { getLocalStorageJwt } from 'utils/localStorage';
import api from 'utils/axios';

export const executeHttpGetAuthorized = async (url: string, params?: any) => {
  const config: AxiosRequestConfig = {
    params,
  };

  config.headers = { Authorization: `${getLocalStorageJwt()}` };
  const response = await api.get(url, config);

  return response;
};

export const executeHttpPostAuthorized = async (url: string, params?: any) => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: `${getLocalStorageJwt()}` },
  };

  const response = await api.post(url, params, config);

  return response;
};

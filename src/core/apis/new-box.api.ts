import { configs } from '@common';
import axios from 'axios';

import { newBoxCookies } from './new-box.cookies';

export const newBoxApi = axios.create({ baseURL: configs.newboxApiUrl });

newBoxApi.interceptors.request.use((config) => {
  const accessToken = newBoxCookies.getAccessToken();

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

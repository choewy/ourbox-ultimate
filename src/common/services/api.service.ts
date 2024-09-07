import axios from 'axios';

import { configs } from '../configs';
import { cookieService } from './cookie.service';

export const apiService = axios.create({ baseURL: configs.newboxApiUrl });

apiService.interceptors.request.use((config) => {
  const accessToken = cookieService.getAccessToken();

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

import axios from 'axios';

import { AxiosTransform } from '@/persistence/axios';
import { APP_URL } from '@/persistence/config';

export const appAxios = axios.create({
  baseURL: APP_URL,
});

export const appAxiosTransform = new AxiosTransform();

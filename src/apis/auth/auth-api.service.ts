import { newBoxApi } from '@core/apis';
import { AxiosInstance } from 'axios';

import { AuthDTO } from './types';

export class AuthApiService {
  constructor(private readonly newBoxApi: AxiosInstance) {}

  async auth() {
    return this.newBoxApi.post<AuthDTO>('auth').then((res) => res.data);
  }
}

export const authApiService = new AuthApiService(newBoxApi);

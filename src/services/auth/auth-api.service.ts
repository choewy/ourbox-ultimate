import { apiService, lastValueFrom } from '@common';

import { AuthDTO, AuthTokenDTO, LoginDTO } from './types';

export class AuthApiService {
  async auth() {
    return lastValueFrom<AuthDTO>(apiService.post('auth'));
  }

  async login(body: LoginDTO) {
    return lastValueFrom<AuthTokenDTO>(apiService.post('auth/login', body));
  }
}

export const authApiService = new AuthApiService();

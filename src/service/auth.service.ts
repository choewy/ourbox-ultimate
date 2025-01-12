import { isEmail, isEmpty } from 'class-validator';

import { cookieService } from './cookie.service';

import { ultimateApi } from '@/api';
import { PagePath } from '@/persistence/enums';
import { SnackEvent } from '@/persistence/event';
import { LoginApiRequestBody } from '@/persistence/types';

export class AuthService {
  public async login(body: LoginApiRequestBody) {
    const email = body.email;
    const password = body.password;

    if (isEmpty(email)) {
      return SnackEvent.warning('이메일을 입력하세요.');
    }

    if (isEmpty(password)) {
      return SnackEvent.warning('비밀번호를 입력하세요.');
    }

    if (!isEmail(email)) {
      return SnackEvent.warning('이메일 형식이 아닙니다.');
    }

    const response = await ultimateApi.signIn(body);

    if (response.error) {
      return SnackEvent.warning(response.error);
    }

    if (response.exception) {
      return SnackEvent.warning(response.exception);
    }

    cookieService.setJwt(response.data.accessToken, response.data.refreshToken);

    window.location.replace(PagePath.Home);
  }
}

export const authService = new AuthService();

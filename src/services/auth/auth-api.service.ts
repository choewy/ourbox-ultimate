import { apiService, lastValueFrom } from '@common';

import { SignInBodyDTO, SignUpBodyDTO } from './dtos';
import { AuthApiErrorCode } from './enums';
import { AuthResponseDTO, AuthTokenResponseDTO } from './types';

export class AuthApiService {
  public getExceptionMessage(errorCode: string) {
    switch (errorCode) {
      case AuthApiErrorCode.InvalidToken:
      case AuthApiErrorCode.TokenExpired:
        return '로그인이 필요한 페이지입니다.';

      case AuthApiErrorCode.LoginFailed:
        return '이메일 또는 비밀번호를 다시 확인하세요.';

      case AuthApiErrorCode.PasswordMismatch:
        return '비밀번호가 같지 않습니다.';

      case AuthApiErrorCode.WrongPassword:
        return '비밀번호가 일치하지 않습니다.';

      case AuthApiErrorCode.AlreadyExists:
        return '이미 등록된 이메일 계정입니다.';

      default:
        return errorCode;
    }
  }

  async auth() {
    return lastValueFrom<AuthResponseDTO>(apiService.post('auth'), this.getExceptionMessage);
  }

  async signin(body: SignInBodyDTO) {
    return lastValueFrom<AuthTokenResponseDTO>(apiService.post('auth/signin', body), this.getExceptionMessage);
  }

  async signup(body: SignUpBodyDTO) {
    return lastValueFrom<AuthTokenResponseDTO>(apiService.post('auth/signup', body), this.getExceptionMessage);
  }
}

export const authApiService = new AuthApiService();

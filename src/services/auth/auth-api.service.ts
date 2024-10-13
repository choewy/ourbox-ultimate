import { LoginInBodyDTO, SignUpBodyDTO } from './dtos';
import { AuthApiErrorCode } from './enums';
import { AuthResponseDTO, AuthTokenResponseDTO } from './types';

import { apiService, lastValueFrom } from '@/common';

export class AuthApiService {
  public getExceptionMessage(errorCode: string) {
    switch (errorCode) {
      case AuthApiErrorCode.InvalidToken:
        return '로그인이 필요한 페이지입니다.';

      case AuthApiErrorCode.LoginFailed:
        return '이메일 또는 비밀번호를 다시 확인하세요.';

      case AuthApiErrorCode.PasswordsMismatch:
        return '비밀번호가 같지 않습니다.';

      case AuthApiErrorCode.WrongPassword:
        return '비밀번호가 일치하지 않습니다.';

      case AuthApiErrorCode.AlreadyExist:
        return '이미 등록된 이메일 계정입니다.';

      case AuthApiErrorCode.InvalidInvitation:
        return '유호하지 않은 초대 코드입니다.';

      case AuthApiErrorCode.SamePassword:
        return '현재 비밀번호로 변경할 수 없습니다.';

      case AuthApiErrorCode.Blocked:
        return '서비스 이용 제한된 계정입니다.';

      default:
        return errorCode;
    }
  }

  async auth() {
    return lastValueFrom<AuthResponseDTO>(apiService.get('auth'), this.getExceptionMessage);
  }

  async login(body: LoginInBodyDTO) {
    return lastValueFrom<AuthTokenResponseDTO>(apiService.post('auth/login', body), this.getExceptionMessage);
  }

  async signup(body: SignUpBodyDTO) {
    return lastValueFrom<AuthTokenResponseDTO>(apiService.post('auth/signup', body), this.getExceptionMessage);
  }
}

export const authApiService = new AuthApiService();

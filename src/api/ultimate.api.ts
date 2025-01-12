import axios, { AxiosError } from 'axios';

import { AxiosApi } from '@/persistence/abstracts';
import { ApiErrorCode, RequestHeader } from '@/persistence/enums';
import { AuthResponseData, LoginApiRequestBody, LoginApiResponseData, LoginOtherApiRequestBody } from '@/persistence/types';
import { configService, cookieService } from '@/service';

const instance = axios.create({ baseURL: configService.getUltimateApiUrl() });

instance.interceptors.request.use((config) => {
  const jwt = cookieService.getJwt();

  if (jwt.accessToken) {
    config.headers[RequestHeader.Authorization] = `Bearer ${jwt.accessToken}`;
  }

  if (jwt.refreshToken) {
    config.headers[RequestHeader.RefreshToken] = jwt.refreshToken;
  }

  return config;
});

export class UltimateApi extends AxiosApi<string, string> {
  protected handleError(e: AxiosError): string {
    if (e.response?.data == null) {
      return `네트워크 오류가 발생하였습니다(${e.message}).`;
    }

    const data = e.response.data as {
      errorCode: ApiErrorCode;
      message: string;
    };

    switch (data.errorCode) {
      case ApiErrorCode.UnknownError:
      case ApiErrorCode.SystemError:
        return `시스템 오류가 발생하였습니다(code : ${data.errorCode}).`;
    }

    return null;
  }

  protected handleException(e: AxiosError) {
    if (e.response?.data == null) {
      return null;
    }

    const data = e.response.data as {
      errorCode: ApiErrorCode;
      message: string;
    };

    switch (data.errorCode) {
      case ApiErrorCode.ValidationError:
        return `요청 값 형식이 잘못되었습니다.`;

      case ApiErrorCode.LoginRequired:
        return `로그인이 필요한 요청입니다.`;

      case ApiErrorCode.InvalidToken:
        return `사용자 인증을 실패하였습니다.`;

      case ApiErrorCode.WrongEmailOrPassword:
        return `이메일이 존재하지 않거나 비밀번호가 일치하지 않습니다.`;

      case ApiErrorCode.InActivatedAccount:
        return `이용 가능한 계정이 아닙니다.`;

      case ApiErrorCode.AccessDenined:
      case ApiErrorCode.CannotUseResource:
        return `접근 권한이 없습니다.`;

      case ApiErrorCode.AlreadyExistUserEmail:
        return `이미 등록된 이메일 주소입니다.`;

      case ApiErrorCode.NotFoundUser:
        return `사용자 정보를 찾을 수 없습니다.`;

      case ApiErrorCode.NotFoundPartner:
        return `고객사 정보를 찾을 수 없습니다.`;

      case ApiErrorCode.NotFoundPartnerChannel:
        return `고객사 판매 채널 정보를 찾을 수 없습니다.`;
    }

    return null;
  }

  async auth() {
    return this.get<AuthResponseData>('/auth');
  }

  async signIn(body: LoginApiRequestBody) {
    return this.post<LoginApiResponseData>('/auth/signin', body);
  }

  async signInOther(body: LoginOtherApiRequestBody) {
    return this.post<LoginApiResponseData>('/auth/signin/other', body);
  }
}

export const ultimateApi = new UltimateApi(instance);

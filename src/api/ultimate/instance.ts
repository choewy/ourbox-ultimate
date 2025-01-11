import axios from 'axios';

import { AxiosTransform } from '@/persistence/axios';
import { getTokens } from '@/persistence/cookie';
import { ApiErrorCode, RequestHeader } from '@/persistence/enums';
import { AxiosErrorHandler } from '@/persistence/types';

export const ultimateAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

ultimateAxios.interceptors.request.use((config) => {
  const tokens = getTokens();

  if (tokens.accessToken) {
    config.headers[RequestHeader.Authorization] = `Bearer ${tokens.accessToken}`;
  }

  if (tokens.refreshToken) {
    config.headers[RequestHeader.RefreshToken] = tokens.refreshToken;
  }

  return config;
});

export const ultimateAxiosErrorHandler: AxiosErrorHandler<string> = (e) => {
  if (e?.response?.data == null) {
    return e.message;
  }

  const data = e.response.data as {
    errorCode: ApiErrorCode;
    message: string;
  };

  if (!data.errorCode) {
    data.errorCode = ApiErrorCode.UnknownError;
  }

  let message = e.message;

  switch (data.errorCode) {
    case ApiErrorCode.UnknownError:
    case ApiErrorCode.SystemError:
      message = `시스템 오류가 발생하였습니다(code : ${data.errorCode}).`;
      break;

    case ApiErrorCode.ValidationError:
      message = `요청 값 형식이 잘못되었습니다.`;
      break;

    case ApiErrorCode.LoginRequired:
      message = `로그인이 필요한 요청입니다.`;
      break;

    case ApiErrorCode.InvalidToken:
      message = `사용자 인증을 실패하였습니다.`;
      break;

    case ApiErrorCode.WrongEmailOrPassword:
      message = `이메일이 존재하지 않거나 비밀번호가 일치하지 않습니다.`;
      break;

    case ApiErrorCode.InActivatedAccount:
      message = `이용 가능한 계정이 아닙니다.`;
      break;

    case ApiErrorCode.AccessDenined:
    case ApiErrorCode.CannotUseResource:
      message = `접근 권한이 없습니다.`;
      break;

    case ApiErrorCode.AlreadyExistUserEmail:
      message = `이미 등록된 이메일 주소입니다.`;
      break;

    case ApiErrorCode.NotFoundUser:
      message = `사용자 정보를 찾을 수 없습니다.`;
      break;

    case ApiErrorCode.NotFoundPartner:
      message = `고객사 정보를 찾을 수 없습니다.`;
      break;

    case ApiErrorCode.NotFoundPartnerChannel:
      message = `고객사 판매 채널 정보를 찾을 수 없습니다.`;
      break;
  }

  return message;
};

export const ultimateAxiosTransform = new AxiosTransform(ultimateAxiosErrorHandler);

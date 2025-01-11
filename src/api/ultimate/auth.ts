import { ultimateAxios, ultimateAxiosTransform } from './instance';

import { AuthResponseData, LoginApiRequestBody, LoginApiResponseData, LoginOtherApiRequestBody } from '@/persistence/types';

export const ultimateAuthApi = {
  auth: async () => {
    return ultimateAxiosTransform.valueFrom<AuthResponseData>(ultimateAxios.get('/auth'));
  },
  login: async (body: LoginApiRequestBody) => {
    return ultimateAxiosTransform.valueFrom<LoginApiResponseData>(ultimateAxios.post('/auth/signin', body));
  },
  loginOther: async (body: LoginOtherApiRequestBody) => {
    return ultimateAxiosTransform.valueFrom<LoginApiResponseData>(ultimateAxios.post('/auth/signin', body));
  },
};

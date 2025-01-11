import { AxiosError } from 'axios';

import { LoginOtherType, UserType } from './enums';

export type AxiosValueFromReturnType<T, E = unknown> = {
  ok: boolean;
  data?: T;
  error?: E;
};

export type AxiosErrorHandler<E> = (e: AxiosError) => E;

export type LoginApiRequestBody = {
  email: string;
  password: string;
};

export type LoginOtherApiRequestBody = {
  type: LoginOtherType;
  otherId: string;
};

export type LoginApiResponseData = {
  accessToken: string;
  refreshToken: string;
};

export type DateISOString = string;

export type User = {
  id: string;
  type: UserType;
  name: string;
  email: string;
  createdAt: DateISOString;
  updatedAt: DateISOString;
  partner?: Partner;
  partnerChannel?: PartnerChannel;
  fulfillment?: Fulfillment;
  fulfillmentCenter?: FulfillmentCenter;
};

export type Partner = {
  id: string;
  name: string;
  createdAt: DateISOString;
  updatedAt: DateISOString;
};

export type PartnerChannel = {
  id: string;
  name: string;
  createdAt: DateISOString;
  updatedAt: DateISOString;
  partner: Partner;
};

export type Fulfillment = {
  id: string;
  name: string;
  createdAt: DateISOString;
  updatedAt: DateISOString;
};

export type FulfillmentCenter = {
  id: string;
  name: string;
  createdAt: DateISOString;
  updatedAt: DateISOString;
  fulfillment: Fulfillment;
};

export type AuthResponseData = {
  user: User;
  origin?: User;
  payload: {
    id: string;
    originId: string;
    iat: number;
    exp: number;
  };
};
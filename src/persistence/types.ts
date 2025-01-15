import { AxiosError } from 'axios';
import { VariantType } from 'notistack';
import { NavigateOptions } from 'react-router-dom';

import { LoginOtherType, OrderBy, UserStatus, UserType } from './enums';

export type SnackbarProps = {
  id?: string;
  variant: VariantType;
  message: string;
};

export type SideMenuProps = {
  title: string;
  Icon: JSX.Element;
  userTypes: UserType[];
  menuItems: SideMenuItemProps[];
};

export type SideMenuItemProps = {
  text: string;
  Icon: JSX.Element;
  userTypes: UserType[];
  to: string;
  options?: NavigateOptions;
};

export type ListRequestParam<T> = {
  skip: number;
  take: number;
} & T;

export type DateRangeParam = {
  startDate?: string;
  endDate?: string;
};

export type ListResponseType<T> = {
  count: number;
  skip: number;
  take: number;
  rows: T[];
};

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

export type UserListKeywordParam = Partial<{
  id: string;
  type: string;
  name: string;
  email: string;
  partner: string;
  partnerChannel: string;
  fulfillment: string;
  fulfillmentCenter: string;
}>;

export type UserListDateRangeParam = Partial<{
  createdAt: DateRangeParam;
  updatedAt: DateRangeParam;
}>;

export type UserListOrderByParam = Partial<{
  id: OrderBy;
  type: OrderBy;
  name: OrderBy;
  email: OrderBy;
  createdAt: OrderBy;
  updatedAt: OrderBy;
  partner: OrderBy;
  partnerChannel: OrderBy;
  fulfillment: OrderBy;
  fulfillmentCenter: OrderBy;
}>;

export type UserListRequestParam = ListRequestParam<{
  keyword: UserListKeywordParam;
  dateRange: UserListDateRangeParam;
  orderBy: UserListOrderByParam;
}>;

export type DateISOString = string;

export type User = {
  id: string;
  type: UserType;
  name: string;
  email: string;
  status: UserStatus;
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

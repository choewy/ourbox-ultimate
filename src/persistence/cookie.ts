import Cookies from 'universal-cookie';

import { CookieProperty } from './enums';

export const cookies = new Cookies();

export const setTokens = (accessToken: string, refreshToken: string) => {
  cookies.set(CookieProperty.AccessToken, accessToken);
  cookies.set(CookieProperty.RefreshToken, refreshToken);
};

export const getTokens = () => {
  return {
    accessToken: cookies.get(CookieProperty.AccessToken) ?? null,
    refreshToken: cookies.get(CookieProperty.RefreshToken) ?? null,
  };
};

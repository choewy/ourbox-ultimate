import Cookies from 'universal-cookie';

import { CookieProperty } from '@/persistence/enums';

export class CookieService extends Cookies {
  public getJwtAccessToken() {
    return this.get(CookieProperty.AccessToken) ?? null;
  }

  public getJwtRefreshToken() {
    return this.get(CookieProperty.RefreshToken) ?? null;
  }

  public setJwtAccessToken(value: string) {
    this.set(CookieProperty.AccessToken, value);
  }

  public setJwtRefreshToken(value: string) {
    this.set(CookieProperty.RefreshToken, value);
  }

  public removeJwtAccessToken() {
    return this.remove(CookieProperty.AccessToken);
  }

  public removeJwtRefreshToken() {
    return this.remove(CookieProperty.RefreshToken);
  }

  public getJwt() {
    return { accessToken: this.getJwtAccessToken(), refreshToken: this.getJwtRefreshToken() };
  }

  public setJwt(accessToken: string, refreshToken: string) {
    this.setJwtAccessToken(accessToken);
    this.setJwtRefreshToken(refreshToken);
  }

  public removeJwt() {
    this.removeJwtAccessToken();
    this.removeJwtRefreshToken();
  }
}

export const cookieService = new CookieService();

import Cookies from 'universal-cookie';

import { CookieName } from '../enums';

export class CookieService extends Cookies {
  public setAccessToken(accessToken: string) {
    this.set(CookieName.AccessToken, accessToken);
  }

  public setRefreshToken(refreshToken: string) {
    this.set(CookieName.RefreshToken, refreshToken);
  }

  public getAccessToken() {
    return this.get(CookieName.AccessToken) ?? null;
  }

  public getRefreshToken() {
    return this.get(CookieName.RefreshToken) ?? null;
  }

  public removeTokens() {
    this.remove(CookieName.AccessToken);
    this.remove(CookieName.RefreshToken);
  }
}

export const cookieService = new CookieService();

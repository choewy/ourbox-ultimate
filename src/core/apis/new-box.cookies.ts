import Cookies from 'universal-cookie';

export class NewBoxCookies extends Cookies {
  private readonly ACCESS_TOKEN_KEY = '___newbox_atk___';
  private readonly REFRESH_TOKEN_KEY = '___newbox_rtk___';

  public setAccessToken(accessToken: string) {
    this.set(this.ACCESS_TOKEN_KEY, accessToken);
  }

  public setRefreshToken(refreshToken: string) {
    this.set(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  public getAccessToken() {
    return this.get(this.ACCESS_TOKEN_KEY) ?? null;
  }

  public getRefreshToken() {
    return this.get(this.REFRESH_TOKEN_KEY) ?? null;
  }
}

export const newBoxCookies = new NewBoxCookies();

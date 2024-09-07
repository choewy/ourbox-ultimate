import { LoginStatus } from '@common';
import { RecoilStore } from '@core/abstracts';
import { AuthDTO } from '@services/auth';

export type AuthStoreValue = {
  loginStatus: LoginStatus;
  auth: AuthDTO | null;
};

export class AuthStore extends RecoilStore<AuthStoreValue> {
  public useLoginStatus() {
    return this.useValue()?.loginStatus;
  }
}

export const authStore = new AuthStore('auth', { loginStatus: LoginStatus.Check, auth: null });

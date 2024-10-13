import { LoginStatus } from '@/common';
import { RecoilStore } from '@/core/abstracts';
import { AuthResponseDTO } from '@/services/auth';

export type AuthStoreValue = {
  loginStatus: LoginStatus;
  auth: AuthResponseDTO | null;
};

export class AuthStore extends RecoilStore<AuthStoreValue> {
  public useLoginStatus() {
    return this.useValue()?.loginStatus;
  }
}

export const authStore = new AuthStore('auth', { loginStatus: LoginStatus.Wait, auth: null });

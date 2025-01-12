import { RecoilStore } from '@/persistence/classes';
import { User } from '@/persistence/types';

export type AuthStoreType = {
  ok: null | boolean;
  current: null | User;
  origin: null | User;
};

export class AuthStore extends RecoilStore<AuthStoreType> {}

export const authStore = new AuthStore('authStore', {
  ok: null,
  current: null,
  origin: null,
});

import { atom } from 'recoil';

export type AuthStoreType = object;

export const authStore = atom<AuthStoreType>({
  key: 'authStore',
  default: {},
});

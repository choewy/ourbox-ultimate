import { atom } from 'recoil';

export type AppStoreType = {
  title: string;
  version: string;
};

export const appStore = atom<AppStoreType>({
  key: 'appStore',
  default: {
    title: 'ULTIMATE',
    version: '',
  },
});

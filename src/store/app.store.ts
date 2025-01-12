import { RecoilStore } from '@/persistence/abstracts';

export type AppStoreType = {
  title: string;
  version: string;
  menuListKey: string;
  menuItemKey: string;
};

export class AppStore extends RecoilStore<AppStoreType> {}

export const appStore = new AppStore('appStore', {
  title: 'ULTIMATE',
  version: '',
  menuListKey: '',
  menuItemKey: '',
});

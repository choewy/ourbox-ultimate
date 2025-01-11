import { atom } from 'recoil';

import { SnackbarProps } from '@/persistence/types';

export type SnackbarStoreType = SnackbarProps[];

export const snackbarStore = atom<SnackbarStoreType>({
  key: 'snackbarStore',
  default: [],
});

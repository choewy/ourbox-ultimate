import { VariantType } from 'notistack';
import { atom } from 'recoil';

export type SnackbarProps = {
  id?: string;
  variant: VariantType;
  message: string;
};

export const snackbarStore = atom<SnackbarProps[]>({
  key: 'snackbarStore',
  default: [],
});

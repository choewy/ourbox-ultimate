import { RecoilStore } from '@/persistence/classes';
import { SnackbarProps } from '@/persistence/types';

export class SnackStore extends RecoilStore<SnackbarProps[]> {}

export const snackStore = new SnackStore('snackStore', []);

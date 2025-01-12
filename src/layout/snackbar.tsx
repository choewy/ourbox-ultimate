import { SnackbarProvider } from 'notistack';

import { snackbarHook } from '@/hook';

export const Snackbar = () => {
  snackbarHook.useListener();
  snackbarHook.useConsumer();

  return <SnackbarProvider maxSnack={5} autoHideDuration={5000} />;
};

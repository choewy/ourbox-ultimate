import { SnackbarProvider } from 'notistack';

import { useSnackbarEventConsumer, useSnackbarEventListener } from '@/hook/snackbar';

const SnackbarComponent = () => {
  useSnackbarEventListener();
  useSnackbarEventConsumer();

  return <></>;
};

export const Snackbar = () => {
  return (
    <SnackbarProvider maxSnack={5} autoHideDuration={5000}>
      <SnackbarComponent />
    </SnackbarProvider>
  );
};

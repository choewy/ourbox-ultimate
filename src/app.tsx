import { CssBaseline, ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { appHook, authHook } from './hook';
import { Snackbar } from './layout/snackbar';
import { DARK_THEME } from './persistence/constants';
import { ROUTER } from './router';

export default function App() {
  appHook.useVersion();
  authHook.useAuth();

  return (
    <ThemeProvider theme={DARK_THEME}>
      <HelmetProvider />
      <CssBaseline />
      <Snackbar />
      <RouterProvider router={ROUTER} />
    </ThemeProvider>
  );
}

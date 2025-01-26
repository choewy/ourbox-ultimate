import { CssBaseline, ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { appHook, authHook } from './hook';
import { Downloader } from './layout/downloader';
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
      <Downloader />
      <RouterProvider router={ROUTER} />
    </ThemeProvider>
  );
}

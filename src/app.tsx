import { CssBaseline, ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthGuard } from './guard';
import { appHook, authHook } from './hook';
import Layout from './layout/layout';
import { Snackbar } from './layout/snackbar';
import HomePage from './page/home';
import LoginPage from './page/login';
import LogoutPage from './page/logout';
import { DARK_THEME } from './persistence/constants';
import { PagePath } from './persistence/enums';

export default function App() {
  appHook.useVersion();
  authHook.useAuth();

  return (
    <ThemeProvider theme={DARK_THEME}>
      <HelmetProvider />
      <CssBaseline />
      <Snackbar />
      <RouterProvider
        router={createBrowserRouter([
          {
            element: <AuthGuard />,
            children: [
              {
                path: PagePath.Login,
                element: <LoginPage />,
              },
              {
                path: PagePath.Logout,
                element: <LogoutPage />,
              },
              {
                element: <Layout />,
                children: [
                  {
                    path: PagePath.All,
                    element: <HomePage />,
                  },
                  {
                    path: '/temp',
                    element: <div>TEMP</div>,
                  },
                ],
              },
            ],
          },
        ])}
      />
    </ThemeProvider>
  );
}

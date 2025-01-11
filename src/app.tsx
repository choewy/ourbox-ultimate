import { CssBaseline, ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Snackbar } from './layout/snackbar/snackbar';
import HomePage from './page/home';
import LoginPage from './page/login';
import LogoutPage from './page/logout';
import { darkTheme } from './persistence/constants';
import { PagePath } from './persistence/enums';

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <HelmetProvider />
      <CssBaseline />
      <Snackbar />
      <RouterProvider
        router={createBrowserRouter([
          {
            path: PagePath.Login,
            element: <LoginPage />,
          },
          {
            path: PagePath.Logout,
            element: <LogoutPage />,
          },
          {
            path: PagePath.All,
            element: <HomePage />,
          },
        ])}
      />
    </ThemeProvider>
  );
}

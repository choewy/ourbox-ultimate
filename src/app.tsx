import { CssBaseline, ThemeProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './page/home';
import LoginPage from './page/login';
import LogoutPage from './page/logout';
import { darkTheme } from './persistence/constants';
import { PagePath } from './persistence/enums';

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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

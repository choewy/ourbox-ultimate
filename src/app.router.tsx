import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PagePath } from '@/common';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import MainPage from '@/pages/main';
import RootPage from '@/pages/root';
import SignOutPage from '@/pages/signout';
import SignUpPage from '@/pages/signup';

export const AppRouter = createBrowserRouter([
  {
    path: PagePath.Root,
    element: <RootPage />,
    children: [
      {
        path: PagePath.Home,
        element: <HomePage />,
      },
      {
        path: PagePath.Main,
        element: <MainPage />,
      },
      {
        path: PagePath.Login,
        element: <LoginPage />,
      },
      {
        path: PagePath.SignUp,
        element: <SignUpPage />,
      },
      {
        path: PagePath.SignOut,
        element: <SignOutPage />,
      },
    ],
  },
  {
    path: PagePath.NotFound,
    element: <Navigate to={PagePath.Home} />,
  },
]);

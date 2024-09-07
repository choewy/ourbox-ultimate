import { PagePath } from '@common';
import HomePage from '@pages/home';
import RootPage from '@pages/root';
import SignInPage from '@pages/signin';
import { createBrowserRouter, Navigate } from 'react-router-dom';

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
        element: <div>Main</div>,
      },
      {
        path: PagePath.SignIn,
        element: <SignInPage />,
      },
    ],
  },
  {
    path: PagePath.NotFound,
    element: <Navigate to={PagePath.Root} />,
  },
]);

import { PagePath } from '@common';
import { AuthInterceptor } from '@interceptors/auth';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const AppRouter = createBrowserRouter([
  {
    path: PagePath.Root,
    element: <AuthInterceptor />,
    children: [
      {
        path: PagePath.Home,
        element: <div>Home</div>,
      },
      {
        path: PagePath.Main,
        element: <div>Main</div>,
      },
      {
        path: PagePath.Login,
        element: <div>Login</div>,
      },
    ],
  },
  {
    path: PagePath.NotFound,
    element: <Navigate to={PagePath.Root} />,
  },
]);

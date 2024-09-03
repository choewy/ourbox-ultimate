import { PagePath } from '@common';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const AppRouter = createBrowserRouter([
  {
    path: PagePath.Root,
    element: <div>Root</div>,
  },
  {
    path: PagePath.NotFound,
    element: <Navigate to={PagePath.Root} />,
  },
]);

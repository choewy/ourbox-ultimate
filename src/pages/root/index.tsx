import Navbar from '@layouts/navbar';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from './guards';

export default function RootPage() {
  return (
    <>
      <AuthGuard />
      <Navbar />
      <Outlet />
    </>
  );
}

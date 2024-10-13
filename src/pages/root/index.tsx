import { Outlet } from 'react-router-dom';

import { AuthGuard } from './guards';

import Navbar from '@/layouts/navbar';
import { ToastProvider } from '@/layouts/toast';

export default function RootPage() {
  return (
    <>
      <AuthGuard />
      <Navbar />
      <ToastProvider />
      <Outlet />
    </>
  );
}

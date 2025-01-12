import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { PagePath } from '@/persistence/enums';
import { SnackbarEvent } from '@/persistence/event';
import { authStore } from '@/store/';

export const AuthGuard = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const authStoreValue = authStore.useValue();

  useEffect(() => {
    switch (authStoreValue.ok) {
      case true:
        if ([String(PagePath.Login)].includes(pathname)) {
          return navigate(PagePath.Home, { replace: true });
        }

        return;

      case false:
        if ([String(PagePath.Logout)].includes(pathname)) {
          SnackbarEvent.info('로그인 페이지로 이동합니다.');

          return navigate(PagePath.Login, { replace: true });
        }

        if (![String(PagePath.Login)].includes(pathname)) {
          SnackbarEvent.warning('로그인이 필요한 페이지입니다.');

          return navigate(PagePath.Login, { replace: true });
        }

        return;
    }
  }, [authStoreValue.ok, pathname]);

  if (authStoreValue.ok === null) {
    return <></>;
  }

  return <Outlet />;
};

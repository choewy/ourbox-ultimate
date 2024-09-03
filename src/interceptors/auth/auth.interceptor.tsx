import { authApiService } from '@apis/auth';
import { LoginStatus, PagePath, pageService } from '@common';
import { FunctionComponent, useCallback, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { authStore } from './auth.store';

export const AuthInterceptor: FunctionComponent = () => {
  const [{ loginStatus }, authDispatcher] = authStore.useState();

  const checkAuth = useCallback(async () => {
    try {
      const auth = await authApiService.auth();

      authDispatcher({
        loginStatus: LoginStatus.Success,
        auth,
      });
    } catch (e) {
      authDispatcher({
        loginStatus: LoginStatus.Failed,
        auth: null,
      });
    }
  }, [authDispatcher]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  switch (loginStatus) {
    case LoginStatus.Success:
      if (pageService.isIn([PagePath.Login]) === true) {
        return <Navigate to={PagePath.Main} replace={true} />;
      } else {
        return <></>;
      }

    case LoginStatus.Failed:
      if (pageService.isIn([PagePath.Home, PagePath.Login]) === false) {
        return <Navigate to={PagePath.Home} replace={true} />;
      } else {
        return <></>;
      }

    default:
      return <></>;
  }
};

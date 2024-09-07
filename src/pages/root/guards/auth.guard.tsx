import { authApiService } from '@apis/auth';
import { LoginStatus, PagePath, pageService } from '@common';
import { authStore } from '@stores';
import { FunctionComponent, useCallback, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthGuard: FunctionComponent = () => {
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
      if (pageService.isIn([PagePath.SignIn, PagePath.SignUp]) === true) {
        return <Navigate to={PagePath.Main} replace={true} />;
      } else {
        return <></>;
      }

    case LoginStatus.Failed:
      if (pageService.isIn([PagePath.Home, PagePath.SignIn, PagePath.SignUp]) === false) {
        return <Navigate to={PagePath.Home} replace={true} />;
      } else {
        return <></>;
      }

    default:
      return <></>;
  }
};

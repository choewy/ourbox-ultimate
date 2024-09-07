import { LoginStatus, PagePath, pageService } from '@common';
import { authHookService } from '@services/auth';
import { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthGuard: FunctionComponent = () => {
  const loginStatus = authHookService.useCheckAuth();

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

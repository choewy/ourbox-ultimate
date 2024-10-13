import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { authApiService } from './auth-api.service';

import { LoginStatus } from '@/common';
import { authStore } from '@/stores';

export class AuthHookService {
  public useCheckAuth() {
    const pathname = useLocation().pathname;
    const [{ loginStatus }, authDispatcher] = authStore.useState();

    const checkAuth = useCallback(async () => {
      const response = await authApiService.auth();

      authDispatcher({
        loginStatus: response.ok ? LoginStatus.Success : LoginStatus.Failed,
        auth: response.data,
      });
    }, [pathname, authDispatcher]);

    useEffect(() => {
      checkAuth();
    }, [pathname, checkAuth]);

    return loginStatus;
  }
}

export const authHookService = new AuthHookService();

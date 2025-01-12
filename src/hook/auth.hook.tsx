import { useCallback, useEffect } from 'react';

import { ultimateApi } from '@/api';
import { SnackEvent } from '@/persistence/event';
import { cookieService } from '@/service';
import { authStore } from '@/store';

class AuthHook {
  public useAuth() {
    const jwt = cookieService.getJwt();
    const setAuthStore = authStore.useSetState();

    const getAuth = useCallback(async () => {
      if (!jwt.accessToken || !jwt.refreshToken) {
        return setAuthStore({ ok: false, current: null, origin: null });
      }

      const response = await ultimateApi.auth();

      if (response.ok) {
        return setAuthStore({ ok: true, current: response.data?.user, origin: response.data?.origin });
      }

      if (response.error) {
        SnackEvent.warning(response.error);
      }

      if (response.exception) {
        SnackEvent.warning(response.exception);
      }

      return setAuthStore({ ok: false, current: null, origin: null });
    }, []);

    useEffect(() => {
      getAuth();
    }, []);
  }

  public useLogout() {
    cookieService.removeJwt();

    const setAuthStore = authStore.useSetState();

    useEffect(() => {
      setAuthStore({ ok: false, current: null, origin: null });
    }, []);
  }
}

export const authHook = new AuthHook();

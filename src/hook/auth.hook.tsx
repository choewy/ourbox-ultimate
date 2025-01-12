import { useCallback, useEffect } from 'react';

import { ultimateAuthApi } from '@/api/ultimate/auth';
import { getTokens, removeTokens } from '@/persistence/cookie';
import { authStore } from '@/store';

class AuthHook {
  public useAuth() {
    const tokens = getTokens();
    const setAuthStore = authStore.useSetState();

    const getAuth = useCallback(async () => {
      if (!tokens.accessToken || !tokens.refreshToken) {
        return setAuthStore({ ok: false, current: null, origin: null });
      }

      const response = await ultimateAuthApi.auth();

      if (!response.ok) {
        return setAuthStore({ ok: false, current: null, origin: null });
      }

      setAuthStore({ ok: true, current: response.data?.user, origin: response.data?.origin });
    }, []);

    useEffect(() => {
      getAuth();
    }, []);
  }

  public useLogout() {
    removeTokens();

    const setAuthStore = authStore.useSetState();

    useEffect(() => {
      setAuthStore({ ok: false, current: null, origin: null });
    }, []);
  }
}

export const authHook = new AuthHook();

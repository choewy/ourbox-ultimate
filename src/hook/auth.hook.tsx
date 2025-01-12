import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { ultimateAuthApi } from '@/api/ultimate/auth';
import { getTokens, removeTokens } from '@/persistence/cookie';
import { authStore } from '@/store/auth';

class AuthHook {
  public useAuth() {
    const tokens = getTokens();
    const setState = useSetRecoilState(authStore);

    const getAuth = useCallback(async () => {
      if (!tokens.accessToken || !tokens.refreshToken) {
        return setState({ ok: false, current: null, origin: null });
      }

      const response = await ultimateAuthApi.auth();

      if (!response.ok) {
        return setState({ ok: false, current: null, origin: null });
      }

      setState({ ok: true, current: response.data?.user, origin: response.data?.origin });
    }, []);

    useEffect(() => {
      getAuth();
    }, []);
  }

  public useReset() {
    removeTokens();

    const setState = useSetRecoilState(authStore);

    useEffect(() => {
      setState({ ok: false, current: null, origin: null });
    }, []);
  }
}

export const authHook = new AuthHook();

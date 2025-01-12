import { useCallback, useEffect } from 'react';

import { appApi } from '@/api/app/version';
import { appStore } from '@/store';

export class AppHook {
  public useVersion() {
    const setAppStore = appStore.useSetState();
    const useGetVersion = useCallback(async () => {
      const response = await appApi.version();
      const version = response.data?.version ?? '';

      setAppStore((prev) => ({ ...prev, version }));
    }, []);

    useEffect(() => {
      useGetVersion();
    }, []);
  }
}

export const appHook = new AppHook();

import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { appApi } from '@/api/app/version';
import { appStore } from '@/store/app';

export const useAppVersion = () => {
  const setState = useSetRecoilState(appStore);
  const useGetVersion = useCallback(async () => {
    const response = await appApi.version();
    const version = response.data?.version ?? '';

    setState((prev) => ({ ...prev, version }));
  }, []);

  useEffect(() => {
    useGetVersion();
  }, []);
};

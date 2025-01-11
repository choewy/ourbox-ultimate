import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { SnackbarEvent } from '@/persistence/event';
import { SnackbarProps } from '@/persistence/types';
import { snackbarStore } from '@/store/snackbar';

export const useEnqueueSnackbarEvent = () => {
  const setState = useSetRecoilState(snackbarStore);

  return useCallback(
    (props: SnackbarProps) => {
      setState((prev) => [...prev, props]);
    },
    [setState],
  );
};

export const useDequeueSnackbarEvent = () => {
  const [state, setState] = useRecoilState(snackbarStore);
  const [target, setTarget] = useState<SnackbarProps | null>(null);

  useEffect(() => {
    if (state.length === 0) {
      return;
    }

    const props = state[0];

    setTarget(props);
    setState((prev) => prev.filter((prev) => prev.id !== props.id));
  }, [state, setState, setTarget]);

  return target;
};

export const useSnackbarEventListener = () => {
  const useEnqueue = useEnqueueSnackbarEvent();
  const snackbarEventHandler = (e: Event) => {
    useEnqueue((e as SnackbarEvent).detail);
  };

  useEffect(() => {
    window.addEventListener(SnackbarEvent.name, snackbarEventHandler);

    return () => {
      window.removeEventListener(SnackbarEvent.name, snackbarEventHandler);
    };
  }, []);
};

export const useSnackbarEventConsumer = () => {
  const eventTarget = useDequeueSnackbarEvent();

  useEffect(() => {
    if (eventTarget == null) {
      return;
    }

    enqueueSnackbar(eventTarget);
  }, [eventTarget, enqueueSnackbar]);
};

import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { SnackbarEvent } from '@/persistence/event';
import { SnackbarProps } from '@/persistence/types';
import { snackbarStore } from '@/store/snackbar';

export class SnackbarHook {
  private useEnqueue() {
    const setState = useSetRecoilState(snackbarStore);

    return useCallback(
      (props: SnackbarProps) => {
        setState((prev) => [...prev, props]);
      },
      [setState],
    );
  }

  private useDequeue() {
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
  }

  public useListener() {
    const useEnqueue = this.useEnqueue();
    const snackbarEventHandler = (e: Event) => {
      useEnqueue((e as SnackbarEvent).detail);
    };

    useEffect(() => {
      window.addEventListener(SnackbarEvent.name, snackbarEventHandler);

      return () => {
        window.removeEventListener(SnackbarEvent.name, snackbarEventHandler);
      };
    }, []);
  }

  public useConsumer() {
    const eventTarget = this.useDequeue();

    useEffect(() => {
      if (eventTarget == null) {
        return;
      }

      enqueueSnackbar(eventTarget);
    }, [eventTarget, enqueueSnackbar]);
  }
}

export const snackbarHook = new SnackbarHook();

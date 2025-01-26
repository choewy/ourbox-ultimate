import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';

import { SnackEvent } from '@/persistence/event';
import { SnackbarProps } from '@/persistence/types';
import { snackStore } from '@/store';

export class SnackbarHook {
  private useEnqueue() {
    const setSnackStore = snackStore.useSetState();

    return useCallback(
      (props: SnackbarProps) => {
        setSnackStore((prev) => [...prev, props]);
      },
      [setSnackStore],
    );
  }

  private useDequeue() {
    const [snackStoreValue, setSnackStore] = snackStore.useState();
    const [target, setTarget] = useState<SnackbarProps | null>(null);

    useEffect(() => {
      if (snackStoreValue.length === 0) {
        return;
      }

      const props = snackStoreValue[0];

      setTarget(props);
      setSnackStore((prev) => prev.filter((prev) => prev.id !== props.id));
    }, [snackStoreValue, setSnackStore, setTarget]);

    return target;
  }

  public useListener() {
    const useEnqueue = this.useEnqueue();
    const xnackEventHandler = (e: Event) => {
      useEnqueue((e as SnackEvent).detail);
    };

    useEffect(() => {
      window.addEventListener(SnackEvent.name, xnackEventHandler);

      return () => {
        window.removeEventListener(SnackEvent.name, xnackEventHandler);
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

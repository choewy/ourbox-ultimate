import { useToast } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';

import { ToastEvent } from './toast.event';

export const ToastProvider = () => {
  const toast = useToast();

  const toastEventHandler = useCallback(
    (e: Event) => {
      toast((e as ToastEvent).detail);
    },
    [toast],
  );

  useEffect(() => {
    window.addEventListener(ToastEvent.name, toastEventHandler);

    return () => {
      window.removeEventListener(ToastEvent.name, toastEventHandler);
    };
  }, [toastEventHandler]);

  return <></>;
};

import { UseToastOptions } from '@chakra-ui/react';

export class ToastEvent extends CustomEvent<UseToastOptions> {
  constructor(options: UseToastOptions) {
    super(ToastEvent.name, {
      detail: {
        position: 'bottom-right',
        title: options.title ?? '',
        description: options.description ?? '',
        status: options.status ?? 'loading',
        duration: options.duration ?? 5000,
        isClosable: options.isClosable ?? true,
      },
    });
  }

  public static dispatch(options: UseToastOptions) {
    window.dispatchEvent(new ToastEvent(options));
  }

  public static warn(title: string, message: string) {
    window.dispatchEvent(
      new ToastEvent({
        title,
        description: message,
        status: 'warning',
      }),
    );
  }

  public static success(title: string, message: string) {
    window.dispatchEvent(
      new ToastEvent({
        title,
        description: message,
        status: 'success',
      }),
    );
  }

  public static error(title: string, message: string) {
    window.dispatchEvent(
      new ToastEvent({
        title,
        description: message,
        status: 'error',
      }),
    );
  }
}

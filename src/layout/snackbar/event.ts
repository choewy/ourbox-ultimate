import { v4 } from 'uuid';

import { SnackbarProps } from './store';

export class SnackbarEvent extends CustomEvent<SnackbarProps> {
  constructor(detail: SnackbarProps) {
    detail.id = v4();

    super(SnackbarEvent.name, { detail });
  }

  static info(message: string) {
    return new SnackbarEvent({ variant: 'info', message }).dispatch();
  }

  static success(message: string) {
    return new SnackbarEvent({ variant: 'success', message }).dispatch();
  }

  static warning(message: string) {
    return new SnackbarEvent({ variant: 'warning', message }).dispatch();
  }

  static error(message: string) {
    return new SnackbarEvent({ variant: 'error', message }).dispatch();
  }

  dispatch(): void {
    window.dispatchEvent(this);
  }
}

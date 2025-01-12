import { v4 } from 'uuid';

import { SnackbarProps } from '../types';

export class SnackEvent extends CustomEvent<SnackbarProps> {
  constructor(detail: SnackbarProps) {
    detail.id = v4();

    super(SnackEvent.name, { detail });
  }

  static info(message: string) {
    return new SnackEvent({ variant: 'info', message }).dispatch();
  }

  static success(message: string) {
    return new SnackEvent({ variant: 'success', message }).dispatch();
  }

  static warning(message: string) {
    return new SnackEvent({ variant: 'warning', message }).dispatch();
  }

  static error(message: string) {
    return new SnackEvent({ variant: 'error', message }).dispatch();
  }

  dispatch(): void {
    window.dispatchEvent(this);
  }
}

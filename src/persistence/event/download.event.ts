import { v4 } from 'uuid';

import { DownloadProps } from '../types';

export class DownloadEvent extends CustomEvent<DownloadProps> {
  constructor(detail: DownloadProps) {
    detail.id = v4();

    super(DownloadEvent.name, { detail });
  }

  static download(url: string, filename: string) {
    return new DownloadEvent({ url, filename }).dispatch();
  }

  dispatch(): void {
    window.dispatchEvent(this);
  }
}

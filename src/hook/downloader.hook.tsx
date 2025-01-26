import { useEffect } from 'react';

import { DownloadEvent } from '@/persistence/event/download.event';

export class DownloaderHook {
  public useListener(downloaderElementId: string) {
    const downloadEventHandler = (e: Event) => {
      const event = e as DownloadEvent;

      const downloader = document.getElementById(downloaderElementId);
      const anchor = document.createElement('a');

      anchor.id = event.detail.id;
      anchor.href = event.detail.url;
      anchor.download = event.detail.filename;

      downloader.appendChild(anchor);
      anchor.click();
      anchor.remove();
    };

    useEffect(() => {
      window.addEventListener(DownloadEvent.name, downloadEventHandler);

      return () => {
        window.addEventListener(DownloadEvent.name, downloadEventHandler);
      };
    }, []);
  }
}

export const downloaderHook = new DownloaderHook();

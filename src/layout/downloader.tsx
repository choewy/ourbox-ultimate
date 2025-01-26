import { downloaderHook } from '@/hook';

export const Downloader = () => {
  const downloaderElementid = 'downloader';

  downloaderHook.useListener(downloaderElementid);

  return <div id={downloaderElementid} />;
};

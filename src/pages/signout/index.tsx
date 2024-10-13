import { useEffect } from 'react';

import { cookieService, PagePath } from '@/common';

export default function SignOutPage() {
  useEffect(() => {
    cookieService.removeTokens();
    window.location.replace(PagePath.Login);
  }, []);

  return <></>;
}

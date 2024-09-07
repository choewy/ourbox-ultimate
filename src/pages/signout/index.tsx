import { cookieService, PagePath } from '@common';
import { useEffect } from 'react';

export default function SignOutPage() {
  useEffect(() => {
    cookieService.removeTokens();
    window.location.replace(PagePath.SignIn);
  }, []);

  return <></>;
}

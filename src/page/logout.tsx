import { authHook } from '@/hook';

export default function LogoutPage() {
  authHook.useLogout();

  return <></>;
}

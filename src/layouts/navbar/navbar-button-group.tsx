import { Button, Stack } from '@chakra-ui/react';
import { LoginStatus, PagePath } from '@common';
import { authStore } from '@stores';
import { ReactElement } from 'react';

export const NavbarButtonGroup = () => {
  const loginStatus = authStore.useLoginStatus();
  const navbarButtons: ReactElement[] = [];

  switch (loginStatus) {
    case LoginStatus.Success:
      navbarButtons.push(
        <Button
          key={[LoginStatus.Success, 'logout'].join('_')}
          as={'a'}
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          href={PagePath.SignOut}
        >
          로그아웃
        </Button>,
      );
      break;

    case LoginStatus.Failed:
      navbarButtons.push(
        <Button
          key={[LoginStatus.Failed, 'signin'].join('_')}
          as={'a'}
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          href={PagePath.SignIn}
        >
          로그인
        </Button>,
        <Button
          key={[LoginStatus.Failed, 'signup'].join('_')}
          as={'a'}
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          href={PagePath.SignUp}
        >
          회원가입
        </Button>,
      );
      break;
  }

  return (
    <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={2}>
      {navbarButtons}
    </Stack>
  );
};

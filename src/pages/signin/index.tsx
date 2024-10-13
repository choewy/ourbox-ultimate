import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import { ChangeEventHandler, FormEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cookieService, PagePath } from '@/common';
import { ToastEvent } from '@/layouts/toast';
import { authApiService, SignInBodyDTO } from '@/services/auth';
import { formService } from '@/services/form';

export default function SignInPage() {
  const navigate = useNavigate();

  const [signInBody, setSignInBody] = useState<SignInBodyDTO>(new SignInBodyDTO({ email: cookieService.getLastestEmail() }));
  const [isSaveEmail, setIsSaveEmail] = useState<boolean>(cookieService.hasLatestEmail());

  const onChangeSignInBody = formService.useOnChangeInput(setSignInBody);
  const onCheckIsSaveEmail: ChangeEventHandler<HTMLInputElement> = useCallback((e) => setIsSaveEmail(e.target.checked), [setIsSaveEmail]);

  const onSignIn: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      const validationMessage = signInBody.validate();

      if (validationMessage) {
        return ToastEvent.warn('로그인 실패', validationMessage);
      }

      const response = await authApiService.signin(signInBody);

      if (response.ok === false) {
        return ToastEvent.warn('로그인 실패', response.message);
      }

      cookieService.setAccessToken(response.data.accessToken);
      cookieService.setRefreshToken(response.data.refreshToken);

      if (isSaveEmail) {
        cookieService.setLastestEmail(signInBody.email);
      } else {
        cookieService.removeLastestEmail();
      }

      window.location.replace(PagePath.Main);
    },
    [signInBody, isSaveEmail],
  );

  const onClickSignUp = useCallback(() => {
    navigate(PagePath.SignUp);
  }, [navigate]);

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={2} mx={'auto'} maxW={'lg'} py={12} px={6} minWidth={'400px'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>로그인</Heading>
        </Stack>
        <Box rounded={'lg'} boxShadow={'lg'} p={8}>
          <form onSubmit={onSignIn}>
            <Stack spacing={4} hideFrom={'form'}>
              <FormControl id="email">
                <FormLabel>이메일</FormLabel>
                <Input type="text" name="email" value={signInBody.email} onChange={onChangeSignInBody} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>비밀번호</FormLabel>
                <Input type="password" name="password" value={signInBody.password} onChange={onChangeSignInBody} />
              </FormControl>
              <Stack spacing={5}>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Checkbox onChange={onCheckIsSaveEmail} defaultChecked={isSaveEmail}>
                    계정 기억하기
                  </Checkbox>
                </Stack>
                <Button type="submit">로그인</Button>
                <Button type="button" onClick={onClickSignUp}>
                  회원가입
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

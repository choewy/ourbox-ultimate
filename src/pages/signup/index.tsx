import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import { FormEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cookieService, PagePath } from '@/common';
import { authApiService, SignUpBodyDTO } from '@/services/auth';
import { formService } from '@/services/form';

export default function SignUpPage() {
  const navigate = useNavigate();

  const [signUpBody, setSignUpBody] = useState<SignUpBodyDTO>(new SignUpBodyDTO());

  const onChangeSignUpBody = formService.useOnChangeInput(setSignUpBody);

  const onSignUp: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      const validationMessage = signUpBody.validate();

      if (validationMessage) {
        return alert(validationMessage);
      }

      const response = await authApiService.signup(signUpBody);

      if (response.ok === false) {
        return alert(`응답오류났다(${response.errorCode})`);
      }

      cookieService.setAccessToken(response.data.accessToken);
      cookieService.setRefreshToken(response.data.refreshToken);

      window.location.replace(PagePath.Main);
    },
    [signUpBody],
  );

  const onClickSignIn = useCallback(() => {
    navigate(PagePath.SignIn);
  }, [navigate]);

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={2} mx={'auto'} maxW={'lg'} py={12} px={6} minWidth={'400px'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>회원가입</Heading>
        </Stack>
        <Box rounded={'lg'} boxShadow={'lg'} p={8}>
          <form onSubmit={onSignUp}>
            <Stack spacing={4} hideFrom={'form'}>
              <FormControl id="name">
                <FormLabel>이름</FormLabel>
                <Input type="text" name="name" value={signUpBody.name} onChange={onChangeSignUpBody} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>이메일</FormLabel>
                <Input type="text" name="email" value={signUpBody.email} onChange={onChangeSignUpBody} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>비밀번호</FormLabel>
                <Input type="password" name="password" value={signUpBody.password} onChange={onChangeSignUpBody} />
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel>비밀번호 확인</FormLabel>
                <Input type="password" name="confirmPassword" value={signUpBody.confirmPassword} onChange={onChangeSignUpBody} />
              </FormControl>
              <Stack spacing={5}>
                <Button type="submit">회원가입</Button>
                <Button type="button" onClick={onClickSignIn}>
                  로그인
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

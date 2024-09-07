import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import { cookieService, PagePath } from '@common';
import { authApiService, LoginDTO } from '@services/auth';
import { ChangeEventHandler, FormEventHandler, useCallback, useState } from 'react';

export default function SignInPage() {
  const [loginBody, setLoginBody] = useState<LoginDTO>({
    email: '',
    password: '',
  });

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setLoginBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [setLoginBody],
  );

  const onClickSignIn: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      if (loginBody.email === '') {
        return alert('이메일 입력해라');
      }

      if (loginBody.password === '') {
        return alert('비밀번호 입력해라');
      }

      const response = await authApiService.login(loginBody);

      if (response.ok === false) {
        return alert(`응답오류났다(${response.errorCode})`);
      }

      cookieService.setAccessToken(response.data.accessToken);
      cookieService.setRefreshToken(response.data.refreshToken);

      window.location.replace(PagePath.Main);
    },
    [loginBody],
  );

  const onClickSignUp = useCallback(async () => {
    return;
  }, []);

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={2} mx={'auto'} maxW={'lg'} py={12} px={6} minWidth={'400px'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>로그인</Heading>
        </Stack>
        <Box rounded={'lg'} boxShadow={'lg'} p={8}>
          <form onSubmit={onClickSignIn}>
            <Stack spacing={4} hideFrom={'form'}>
              <FormControl id="email">
                <FormLabel>이메일</FormLabel>
                <Input type="email" name="email" value={loginBody.email} onChange={onChangeInput} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>비밀번호</FormLabel>
                <Input type="password" name="password" value={loginBody.password} onChange={onChangeInput} />
              </FormControl>
              <Stack spacing={5}>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Checkbox>계정 기억하기</Checkbox>
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

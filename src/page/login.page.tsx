import { Box, Button, FormControl, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, MouseEvent, useCallback, useState } from 'react';

import { authService } from '@/service';

export default function LoginPage() {
  const [requestBody, setRequestBody] = useState({
    email: '',
    password: '',
  });

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setRequestBody((prev) => ({ ...prev, email: e.target.value })),
    [setRequestBody],
  );

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setRequestBody((prev) => ({ ...prev, password: e.target.value })),
    [setRequestBody],
  );

  const onClickLoginButton = useCallback(
    async (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await authService.login({ email: requestBody.email, password: requestBody.password });
    },
    [requestBody],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundImage: 'url(/image/login-background.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          margin: 'auto',
          backgroundColor: 'rgba(0,0,0,0.7)',
          width: '100vw',
          height: '200px',
        }}
      >
        <FormControl
          component="form"
          sx={{
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <TextField variant="outlined" type="text" label="이메일" value={requestBody.email} onChange={onChangeEmail} sx={{ width: '250px' }} />
            <TextField variant="outlined" type="password" label="비밀번호" value={requestBody.password} onChange={onChangePassword} sx={{ width: '250px' }} />
          </Box>

          <Box>
            <Button type="submit" size="large" variant="contained" sx={{ width: '250px' }} onClick={onClickLoginButton}>
              로그인
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
}

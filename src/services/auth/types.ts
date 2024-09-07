export type AuthDTO = {
  name: string;
  email: string;
  partner: string | null;
  center: string | null;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type AuthTokenDTO = {
  accessToken: string;
  refreshToken: string;
};

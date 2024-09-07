export type AuthResponseDTO = {
  name: string;
  email: string;
  partner: string | null;
  center: string | null;
};

export type AuthTokenResponseDTO = {
  accessToken: string;
  refreshToken: string;
};

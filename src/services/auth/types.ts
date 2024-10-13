export type AuthResponseContextDTO = {
  id: number;
  name: string;
};

export type AuthResponseRoleDTO = {
  id: number;
  name: string;
  permissionTargets: string[];
};

export type AuthResponseDTO = {
  id: number;
  name: string;
  email: string;
  roles: AuthResponseRoleDTO[];
  partnerGroup: AuthResponseContextDTO | null;
  partner: AuthResponseContextDTO | null;
  fulfillmentGroup: AuthResponseContextDTO | null;
  fulfillment: AuthResponseContextDTO | null;
};

export type AuthTokenResponseDTO = {
  accessToken: string;
  refreshToken: string;
};

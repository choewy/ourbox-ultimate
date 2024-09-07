export enum PagePath {
  Root = '/',
  Home = '/home',
  Main = '/main',
  SignIn = '/signin',
  SignUp = '/signup',
  SignOut = '/signout',
  NotFound = '*',
}

export enum LoginStatus {
  Check = 0,
  Success = 1,
  Failed = 2,
}

export enum InterceptorStatus {
  Checking = 0,
  Passed = 1,
  Failed = 2,
}

export enum CookieName {
  AccessToken = '___newbox_atk___',
  RefreshToken = '___newbox_rtk___',
}

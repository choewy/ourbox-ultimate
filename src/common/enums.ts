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
  Wait = 0,
  Success = 1,
  Failed = 2,
}

export enum CookieName {
  LastestEmail = '___newbody_lastest_email__',
  AccessToken = '___newbox_access_token___',
  RefreshToken = '___newbox_refresh_token___',
}

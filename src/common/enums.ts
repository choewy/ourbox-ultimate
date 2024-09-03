export enum PagePath {
  Root = '/',
  Home = '/home',
  Main = '/main',
  Login = '/login',
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

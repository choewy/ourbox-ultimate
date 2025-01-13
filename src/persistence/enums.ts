export enum PagePath {
  Home = '/',
  Login = '/login',
  Logout = '/logout',
  Purchasers = '/purchasers',
  Consigners = '/consigners',
  DeliveryCompanySettings = '/delivery-company-settings',
  Users = '/users',
  Fulfillments = '/fulfillments',
  FulfillmentCenters = '/fulfillment-centers',
  Partners = '/partners',
  PartnerChannels = '/partner-channels',
  Products = 'products',
  Gifts = 'gifts',
  Orders = 'orders',
  Claims = 'claims',
  Locations = 'locations',
  Boxes = 'boxes',
  Receivings = 'receivings',
  Releases = 'releases',
  Collections = 'collections',
  Stocks = 'stocks',
  All = '*',
}

export enum CookieProperty {
  AccessToken = 'ultimate_atk',
  RefreshToken = 'ultimate_rtk',
}

export enum RequestHeader {
  Authorization = 'Authorization',
  RefreshToken = 'x-refresh-token',
}

export enum ResponseHeader {
  RequestId = 'x-request-id',
  AccessToken = 'x-access-token',
  RefreshToken = 'x-refresh-token',
}

export enum ApiErrorCode {
  UnknownError = '000',
  SystemError = '001',
  ValidationError = '002',
  LoginRequired = '100',
  InvalidToken = '101',
  WrongEmailOrPassword = '102',
  InActivatedAccount = '103',
  AccessDenined = '104',
  CannotUseResource = '105',
  AlreadyExistUserEmail = '200',
  NotFoundUser = '201',
  NotFoundPartner = '300',
  NotFoundPartnerChannel = '301',
  AlreadyExistFulfillmentCenterCode = '400',
  NotFoundFulfillment = '401',
  NotFoundFulfillmentCenter = '402',
  NotFoundPurchaser = '500',
  NotFoundConsigner = '600',
  NotFoundProduct = '700',
  AlreadyExistDeliveryCompanyCode = '800',
  NotFoundDeliveryCompanyCode = '801',
  AlreadyExistDeliveryCompanySetting = '900',
  NotFoundDeliveryCompanySetting = '901',
}

export enum LoginOtherType {
  Convert = 'convert',
  Restore = 'restore',
}

export enum UserType {
  Admin = 'admin',
  PartnerAdmin = 'partner-admin',
  PartnerUser = 'partner-user',
  FulfillmentAdmin = 'fulfillment-admin',
  FulfillmentUser = 'fulfillment-user',
}

export enum UserTabType {
  All = '',
  Admin = 'admin',
  Partner = 'partner',
  Fulfillment = 'fulfillment',
}

export enum OrderBy {
  Asc = 'asc',
  Desc = 'desc',
}

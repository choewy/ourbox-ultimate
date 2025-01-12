import {
  AddShoppingCart,
  Archive,
  Category,
  Factory,
  Group,
  HomeWork,
  Inventory,
  LocalGroceryStore,
  LocalShipping,
  LocationCity,
  ManageAccounts,
  PublishedWithChanges,
  Redeem,
  Settings,
  Storefront,
  Unarchive,
  Widgets,
} from '@mui/icons-material';
import { createTheme } from '@mui/material';

import { PagePath, UserType } from './enums';
import { SideMenuProps } from './types';

export const DARK_THEME = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontSize: 12,
  },
});

export const SIDE_MENU_PROPS_LIST: Array<SideMenuProps> = [
  {
    title: '계정',
    Icon: <ManageAccounts />,
    userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.PartnerAdmin],
    menuItems: [
      {
        text: '계정 관리',
        Icon: <ManageAccounts />,
        userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.PartnerAdmin],
        to: PagePath.Users,
      },
    ],
  },
  {
    title: '풀필먼트',
    Icon: <LocationCity />,
    userTypes: [UserType.Admin, UserType.FulfillmentAdmin],
    menuItems: [
      {
        text: '풀필먼트 관리',
        Icon: <LocationCity />,
        userTypes: [UserType.Admin],
        to: PagePath.Fulfillments,
      },
      {
        text: '풀필먼트 센터 관리',
        Icon: <Factory />,
        userTypes: [UserType.Admin, UserType.FulfillmentAdmin],
        to: PagePath.FulfillmentCenters,
      },
    ],
  },
  {
    title: '고객사',
    Icon: <HomeWork />,
    userTypes: [UserType.Admin, UserType.PartnerAdmin],
    menuItems: [
      {
        text: '고객사 관리',
        Icon: <HomeWork />,
        userTypes: [UserType.Admin],
        to: PagePath.Partners,
      },
      {
        text: '고객사 판매채널 관리',
        Icon: <Storefront />,
        userTypes: [UserType.Admin, UserType.PartnerAdmin],
        to: PagePath.PartnerChannels,
      },
    ],
  },
  {
    title: '품목',
    Icon: <Category />,
    userTypes: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser],
    menuItems: [
      {
        text: '품목 관리',
        Icon: <Category />,
        userTypes: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser],
        to: PagePath.Products,
      },
      {
        text: '사은품 관리',
        Icon: <Redeem />,
        userTypes: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser],
        to: PagePath.Gifts,
      },
    ],
  },
  {
    title: '주문',
    Icon: <LocalGroceryStore />,
    userTypes: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser],
    menuItems: [
      {
        text: '주문 관리',
        Icon: <LocalGroceryStore />,
        userTypes: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser],
        to: PagePath.Orders,
      },
      {
        text: '클레임 관리',
        Icon: <AddShoppingCart />,
        userTypes: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser],
        to: PagePath.Claims,
      },
    ],
  },
  {
    title: '입고',
    Icon: <Archive />,
    userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
    menuItems: [
      {
        text: '입고 관리',
        Icon: <Archive />,
        userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
        to: PagePath.Receivings,
      },
    ],
  },
  {
    title: '출고',
    Icon: <Unarchive />,
    userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
    menuItems: [
      {
        text: '출고 관리',
        Icon: <Unarchive />,
        userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
        to: PagePath.Releases,
      },
    ],
  },
  {
    title: '회수',
    Icon: <PublishedWithChanges />,
    userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
    menuItems: [
      {
        text: '회수 관리',
        Icon: <PublishedWithChanges />,
        userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
        to: PagePath.Collections,
      },
    ],
  },
  {
    title: '재고',
    Icon: <Widgets />,
    userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
    menuItems: [
      {
        text: '재고 관리',
        Icon: <Widgets />,
        userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
        to: PagePath.Stocks,
      },
    ],
  },
  {
    title: '설정',
    Icon: <Settings />,
    userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser, UserType.PartnerAdmin, UserType.PartnerUser],
    menuItems: [
      {
        text: '매입처 관리',
        Icon: <Group />,
        userTypes: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser],
        to: PagePath.Purchasers,
      },
      {
        text: '발송인 관리',
        Icon: <Group />,
        userTypes: [UserType.Admin, UserType.PartnerAdmin, UserType.PartnerUser],
        to: PagePath.Consigners,
      },
      {
        text: '포장박스 관리',
        Icon: <Inventory />,
        userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
        to: PagePath.Boxes,
      },
      {
        text: '택배사 설정 관리',
        Icon: <LocalShipping />,
        userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.FulfillmentUser],
        to: PagePath.DeliveryCompanySettings,
      },
    ],
  },
];

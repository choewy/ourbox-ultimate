import { Group } from '@mui/icons-material';
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
    Icon: <Group />,
    userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.PartnerAdmin],
    menuItems: [
      {
        text: '계정 목록',
        Icon: <Group />,
        userTypes: [UserType.Admin, UserType.FulfillmentAdmin, UserType.PartnerAdmin],
        to: PagePath.Users,
      },
    ],
  },
  {
    title: '풀필먼트',
    Icon: <Group />,
    userTypes: [UserType.Admin, UserType.FulfillmentAdmin],
    menuItems: [
      {
        text: '풀필먼트 목록',
        Icon: <Group />,
        userTypes: [UserType.Admin],
        to: PagePath.Fulfillments,
      },
      {
        text: '풀필먼트 센터 목록',
        Icon: <Group />,
        userTypes: [UserType.Admin, UserType.FulfillmentAdmin],
        to: PagePath.FulfillmentCenters,
      },
    ],
  },
  {
    title: '고객사',
    Icon: <Group />,
    userTypes: [UserType.Admin, UserType.PartnerAdmin],
    menuItems: [
      {
        text: '고객사 목록',
        Icon: <Group />,
        userTypes: [UserType.Admin],
        to: PagePath.Partners,
      },
      {
        text: '고객사 판매채널 목록',
        Icon: <Group />,
        userTypes: [UserType.Admin, UserType.PartnerAdmin],
        to: PagePath.PartnerChannels,
      },
    ],
  },
];

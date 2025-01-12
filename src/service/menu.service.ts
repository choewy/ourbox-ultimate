import { SIDE_MENU_PROPS_LIST } from '@/persistence/constants';
import { SideMenuProps, User } from '@/persistence/types';

export class MenuService {
  public getSideMenuPropsList(currentUser: User) {
    const sideMenuPropsList: SideMenuProps[] = [];

    if (currentUser == null) {
      return sideMenuPropsList;
    }

    for (const SIDE_MENU_PROPS of SIDE_MENU_PROPS_LIST) {
      if (!SIDE_MENU_PROPS.userTypes.includes(currentUser.type)) {
        continue;
      }

      const sideMenuProps: SideMenuProps = {
        ...SIDE_MENU_PROPS,
        menuItems: SIDE_MENU_PROPS.menuItems.filter((menuItem) => menuItem.userTypes.includes(currentUser.type)),
      };

      if (sideMenuProps.menuItems.length === 0) {
        continue;
      }

      sideMenuPropsList.push(sideMenuProps);
    }

    return sideMenuPropsList;
  }
}

export const menuService = new MenuService();

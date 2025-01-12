import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { SideMenuProps } from '@/persistence/types';
import { appStore } from '@/store';

export type SideMenuListProps = {
  open: boolean;
  menuListKey: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  menuProps: SideMenuProps;
  divider?: boolean;
};

export const SideMenuList = (props: SideMenuListProps) => {
  const { open, setOpen, menuProps, divider, menuListKey } = props;

  const navigate = useNavigate();
  const [appStoreValue, setAppStore] = appStore.useState();

  const collapsed = appStoreValue.menuListKey === menuListKey;

  const onClickVisible = () => {
    if (!open) {
      setOpen(true);
    }

    setAppStore((prev) => ({
      ...prev,
      menuListKey: collapsed ? '' : menuListKey,
    }));
  };

  if (menuProps.menuItems.length === 0) {
    return <></>;
  }

  return (
    <>
      <ListItem disablePadding sx={{ minHeight: 48 }}>
        <ListItemButton sx={{ minHeight: 48, px: 2.5, justifyContent: open ? 'initial' : 'center' }} onClick={onClickVisible}>
          <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
            {open ? collapsed ? <ExpandLess /> : <ExpandMore /> : menuProps.Icon}
          </ListItemIcon>
          <ListItemText primary={menuProps.title} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
      <Collapse in={open && collapsed} timeout="auto" unmountOnExit>
        <List disablePadding>
          {menuProps.menuItems.map((menuItem, i) => {
            const menuItemKey = [menuProps.title, menuItem.text, i].join('_');

            return (
              <ListItem key={menuItemKey} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  selected={appStoreValue.menuItemKey === menuItemKey}
                  sx={{ minHeight: 48, px: 2.5, justifyContent: open ? 'initial' : 'center' }}
                  onClick={() => {
                    setAppStore((prev) => ({ ...prev, menuItemKey }));
                    navigate(menuItem.to, menuItem.options);
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>{menuItem.Icon}</ListItemIcon>
                  <ListItemText primary={menuItem.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        {divider && <Divider />}
      </Collapse>
    </>
  );
};

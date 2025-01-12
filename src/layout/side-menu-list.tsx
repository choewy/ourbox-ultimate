import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SideMenuProps } from '@/persistence/types';

export type SideMenuListProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  menuProps: SideMenuProps;
  divider?: boolean;
};

export const SideMenuList = (props: SideMenuListProps) => {
  const { open, setOpen, menuProps, divider } = props;

  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);

  const onClickVisible = () => {
    if (open) {
      setVisible((prev) => !prev);

      return;
    }

    setOpen(true);
    setVisible(true);
  };

  if (menuProps.menuItems.length === 0) {
    return <></>;
  }

  return (
    <>
      <ListItem disablePadding sx={{ minHeight: 48 }}>
        <ListItemButton sx={{ minHeight: 48, px: 2.5, justifyContent: open ? 'initial' : 'center' }} onClick={onClickVisible}>
          <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
            {open ? visible ? <ExpandLess /> : <ExpandMore /> : menuProps.Icon}
          </ListItemIcon>
          <ListItemText primary={menuProps.title} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
      <Collapse in={open && visible} timeout="auto" unmountOnExit>
        <List disablePadding>
          {menuProps.menuItems.map((menuItem, i) => (
            <ListItem key={[menuProps.title, menuItem.text, i].join('_')} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{ minHeight: 48, px: 2.5, justifyContent: open ? 'initial' : 'center' }}
                onClick={() => navigate(menuItem.to, menuItem.options)}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>{menuItem.Icon}</ListItemIcon>
                <ListItemText primary={menuItem.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {divider && <Divider />}
      </Collapse>
    </>
  );
};

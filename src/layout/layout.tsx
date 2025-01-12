import { ChevronLeft, ChevronRight, Menu } from '@mui/icons-material';
import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps, Drawer as MuiDrawer, Box, IconButton, Divider, Toolbar, Typography } from '@mui/material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { SideMenuList } from './side-menu-list';

import { menuService, userService } from '@/service';
import { authStore } from '@/store';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}));

export default function Layout() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const authStoreValue = authStore.useValue();
  const sideMenuPropsList = menuService.getSideMenuPropsList(authStoreValue.current);
  const sideMenuPropsListCount = sideMenuPropsList.length;

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={[{ marginRight: 5 }, open && { display: 'none' }]}>
            <Menu />
          </IconButton>

          {/* TODO 타이틀 분리 */}
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer {userService.getProfileText(authStoreValue.current)}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}</IconButton>
        </DrawerHeader>
        <Divider />

        {sideMenuPropsList.map((menuProps, i) => {
          const menuListKey = ['menuProps', menuProps.title, i].join('_');

          return (
            <SideMenuList
              key={menuListKey}
              open={open}
              setOpen={setOpen}
              menuListKey={menuListKey}
              menuProps={menuProps}
              divider={i < sideMenuPropsListCount - 1}
            />
          );
        })}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

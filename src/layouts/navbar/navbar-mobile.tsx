import { Stack } from '@chakra-ui/react';

import { NAVBAR_ITEMS } from './constants';
import { NavbarMobileSub } from './navbar-mobile-sub';

export const NavbarMobile = () => {
  return (
    <Stack p={4} display={{ md: 'none' }}>
      {NAVBAR_ITEMS.map((navItem) => (
        <NavbarMobileSub key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

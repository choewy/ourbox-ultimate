import { Box, Popover, PopoverContent, PopoverTrigger, Stack } from '@chakra-ui/react';

import { NAVBAR_ITEMS } from './constants';
import { NavbarDesktopSub } from './navbar-desktop-sub';

export const NavbarDesktop = () => {
  return (
    <Stack direction={'row'} spacing={4}>
      {NAVBAR_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box as="a" p={2} href={navItem.href ?? '#'} fontSize={'sm'} fontWeight={500}>
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow={'xl'} p={4} rounded={'xl'} minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <NavbarDesktopSub key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

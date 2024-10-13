import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, IconButton, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react';

import { NavbarButtonGroup } from './navbar-button-group';
import { NavbarDesktop } from './navbar-desktop';
import { NavbarMobile } from './navbar-mobile';

import { PagePath, pageService } from '@/common';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  if (pageService.isIn([PagePath.SignIn, PagePath.SignUp]) === true) {
    return <></>;
  }

  return (
    <Box>
      <Flex minH={'60px'} py={{ base: 2 }} px={{ base: 4 }} borderBottom={1} borderStyle={'solid'} align={'center'}>
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text textAlign={useBreakpointValue({ base: 'center', md: 'left' })} fontFamily={'heading'}>
            Logo
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <NavbarDesktop />
          </Flex>
        </Flex>

        <NavbarButtonGroup />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <NavbarMobile />
      </Collapse>
    </Box>
  );
}

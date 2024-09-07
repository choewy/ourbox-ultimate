import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react';

import { NavbarItem } from './navbar-item';

export const NavbarDesktopSub = ({ label, href, subLabel }: NavbarItem) => {
  return (
    <Box as="a" href={href} role={'group'} display={'block'} p={2} rounded={'md'}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

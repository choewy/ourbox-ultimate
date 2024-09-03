import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';

import { AppRouter } from './app.router';
import { appStore } from './app.store';

export default function AppComponent() {
  const theme = appStore.useTheme();

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={AppRouter} />
    </ChakraProvider>
  );
}

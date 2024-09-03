import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';

import { appStore } from './app.store';
import { AppRouter } from './app.router';

export default function AppComponent() {
  const theme = appStore.useTheme();

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={AppRouter} />
    </ChakraProvider>
  );
}

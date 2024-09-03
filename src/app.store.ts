import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { defaultThemeConfig } from '@common';
import { RecoilStore } from '@core/abstracts';

export type AppStoreValue = {
  themeConfig: ThemeConfig;
};

export class AppStore extends RecoilStore<AppStoreValue> {
  public useTheme() {
    const config = this.useValue().themeConfig;

    return extendTheme({ config });
  }
}

export const appStore = new AppStore('app', {
  themeConfig: defaultThemeConfig,
});

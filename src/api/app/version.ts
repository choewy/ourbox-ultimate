import { appAxios, appAxiosTransform } from './instance';

export const appApi = {
  version() {
    return appAxiosTransform.valueFrom<{ version: string }>(appAxios.get('/version.json'));
  },
};

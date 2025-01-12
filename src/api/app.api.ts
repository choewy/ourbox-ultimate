import axios from 'axios';

import { AxiosApi } from '@/persistence/abstracts';
import { configService } from '@/service';

const instance = axios.create({ baseURL: configService.getAppUrl() });

export class AppApi extends AxiosApi {
  async getVersion() {
    return this.get<{ version: string }>('/version.json');
  }
}

export const appApi = new AppApi(instance);

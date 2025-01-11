import { AxiosResponse } from 'axios';

import { AxiosErrorHandler, AxiosValueFromReturnType } from './types';

export class AxiosTransform<E = unknown> {
  constructor(private readonly errorHandler?: AxiosErrorHandler<E>) {}

  async valueFrom<T>(promiseResponse: Promise<AxiosResponse>): Promise<AxiosValueFromReturnType<T, E>> {
    return promiseResponse
      .then((res) => ({
        ok: true,
        data: res.data,
      }))
      .catch((e) => ({
        ok: false,
        error: this.errorHandler ? this.errorHandler(e) : (e.response?.data ?? e),
      }));
  }
}

import { InterceptorStatus } from '@common';
import { RecoilStore } from '@core/abstracts';

export type InterceptorStoreValue = {
  AuthInterceptor: InterceptorStatus;
};

export class InterceptorStore extends RecoilStore<InterceptorStoreValue> {
  public usePassed() {
    const values = this.useValue();

    const stackTrace = new Error().stack;
    const stackTraceLine = stackTrace.split('\n')[2];

    for (const [componentName, status] of Object.entries(values)) {
      if (stackTraceLine.includes(componentName)) {
        continue;
      }

      if (status === InterceptorStatus.Failed) {
        return false;
      }
    }

    return true;
  }
}

export const interceptorStore = new InterceptorStore('interceptor', { AuthInterceptor: InterceptorStatus.Checking });

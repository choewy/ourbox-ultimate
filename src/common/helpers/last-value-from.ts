import { AxiosError, AxiosResponse } from 'axios';

export type LastValue<T> = {
  ok: boolean;
  status: number;
  data: null | T;
  message: null | string;
  errorCode: null | string;
};

export const lastValueFrom = async <T>(promise: Promise<AxiosResponse<T>>, exceptionHandler?: (errorCode: string) => string) => {
  const lastValue: LastValue<T> = {
    ok: false,
    status: -1,
    data: null,
    message: null,
    errorCode: null,
  };

  try {
    const response = await promise;

    lastValue.status = response.status;
    lastValue.data = response.data;
    lastValue.ok = true;
  } catch (e) {
    const error = e as AxiosError;
    const errorCode = (error?.response?.data as any)?.errorCode ?? `${error.message}(${error.code})`;

    lastValue.ok = false;
    lastValue.status = error.status;
    lastValue.message = typeof exceptionHandler === 'function' ? exceptionHandler(errorCode) : errorCode;
    lastValue.errorCode = errorCode;
  }

  return lastValue;
};

import { AxiosError, AxiosResponse } from 'axios';

export type LastValue<T> = {
  ok: boolean;
  status: number;
  data: null | T;
  errorCode: null | string;
};

export const lastValueFrom = async <T>(promise: Promise<AxiosResponse<T>>) => {
  const lastValue: LastValue<T> = {
    ok: false,
    status: -1,
    data: null,
    errorCode: null,
  };

  try {
    const response = await promise;

    lastValue.status = response.status;
    lastValue.data = response.data;
    lastValue.ok = true;
  } catch (e) {
    const error = e as AxiosError;

    lastValue.ok = false;
    lastValue.status = error.status;
    lastValue.errorCode = ((error?.response?.data as any) ?? { errorCode: 'SYSTEM_ERROR' })?.errorCode;
  }

  return lastValue;
};

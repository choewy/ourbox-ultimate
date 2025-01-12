import { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export type AxiosResponseType<T, ErrorType = any, ExceptionType = any> = {
  ok: boolean;
  data: T;
  error: ErrorType | null;
  exception: ExceptionType | null;
};

export abstract class AxiosService {
  constructor(private readonly instance: Axios) {}

  private _handleError<E = any>(e: AxiosError) {
    if (e.response?.status == null || e.response.status < 200 || e.response.status >= 500) {
      return this.handleError<E>(e);
    }

    return null;
  }

  private _handleException<E = any>(e: AxiosError) {
    if (e.response?.status && e.response.status > 300 && e.response.status < 500) {
      return this.handleException<E>(e);
    }

    return null;
  }

  protected handleError<E = any>(e: AxiosError) {
    return (e.response?.data ?? e) as E;
  }

  protected handleException<E = any>(e: AxiosError) {
    return e.response?.data as E;
  }

  private async valueOf<T, ErrorType = any, ExceptionType = any>(
    promiseResponse: Promise<AxiosResponse>,
  ): Promise<AxiosResponseType<T, ErrorType, ExceptionType>> {
    return promiseResponse
      .then((res) => ({
        ok: true,
        data: res.data,
        error: null,
        exception: null,
      }))
      .catch((e) => ({
        ok: false,
        data: null,
        error: this._handleError<ErrorType>(e),
        exception: this._handleException<ExceptionType>(e),
      }));
  }

  async options<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.options(url, config));
  }

  async head<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.head(url, config));
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.get(url, config));
  }

  async post<T = any, D = any>(url: string, body?: D, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.post(url, body, config));
  }

  async patch<T = any, D = any>(url: string, body?: D, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.patch(url, body, config));
  }

  async put<T = any, D = any>(url: string, body?: D, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.put(url, body, config));
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.delete(url, config));
  }
}

import { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export type AxiosResponseType<T, ErrorType = any, ExceptionType = any> = {
  ok: boolean;
  data: T;
  error: ErrorType | null;
  exception: ExceptionType | null;
};

export abstract class AxiosApi<ErrorType = any, ExceptionType = any> {
  constructor(private readonly instance: Axios) {}

  private _handleError(e: AxiosError) {
    if (e.response?.status == null || e.response.status < 200 || e.response.status >= 500) {
      return this.handleError(e);
    }

    return null;
  }

  private _handleException(e: AxiosError) {
    if (e.response?.status && e.response.status > 300 && e.response.status < 500) {
      return this.handleException(e);
    }

    return null;
  }

  protected handleError(e: AxiosError): ErrorType {
    return (e.response?.data ?? e) as ErrorType;
  }

  protected handleException(e: AxiosError): ExceptionType {
    return e.response?.data as ExceptionType;
  }

  private async valueOf<T>(promiseResponse: Promise<AxiosResponse>): Promise<AxiosResponseType<T, ErrorType, ExceptionType>> {
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
        error: this._handleError(e),
        exception: this._handleException(e),
      }));
  }

  async options<T = any>(url?: string, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.options(url, config));
  }

  async head<T = any>(url?: string, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.head(url, config));
  }

  async get<T = any>(url?: string, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.get(url, config));
  }

  async post<T = any, D = any>(url?: string, body?: D, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.post(url, body, config));
  }

  async patch<T = any, D = any>(url?: string, body?: D, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.patch(url, body, config));
  }

  async put<T = any, D = any>(url?: string, body?: D, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.put(url, body, config));
  }

  async delete<T = any>(url?: string, config?: AxiosRequestConfig) {
    return this.valueOf<T>(this.instance.delete(url, config));
  }
}

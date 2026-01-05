import { type AxiosRequestConfig } from 'axios';
import axiosClient from '../axiosClient';

export interface PromiseWithCancel<T> extends Promise<T> {
  cancel?: () => void;
}

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): PromiseWithCancel<T> => {
  const abortController = new AbortController();

  const promise = axiosClient({
    ...config,
    ...options,
    signal: abortController.signal,
  }).then(({ data }) => data) as PromiseWithCancel<T>;

  promise.cancel = () => {
    abortController.abort();
  };

  return promise;
};

export default customInstance;

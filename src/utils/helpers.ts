import { toast } from 'react-toastify';
import { AXIOS_RESPONSE_TYPE, IAxiosResponse } from './axios';

export const getMessage = (messages: string | string[]): string => {
  if (typeof messages === 'string') {
    return messages;
  }
  messages.forEach((m: string, index: number) => {
    messages[index] = m[0].toUpperCase() + m.slice(1);
  });
  return messages.join('\n');
};

export const toastNotify = (
  result: IAxiosResponse,
  options?: {
    successMessage?: string;
    errorMessage?: string;
  },
): void => {
  if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
    toast.success(options?.successMessage || result.data.message || 'Success');
  } else toast.error(options?.errorMessage || (result.data.message && getMessage(result.data.message)) || 'Error');
};

export const timeSince = (date: Date): string => {
  var seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return 'Just now';
};

export const sliceString = (str: string, length: number): string => {
  if (str.length > length) {
    return str.slice(0, length) + '...';
  }
  return str;
};

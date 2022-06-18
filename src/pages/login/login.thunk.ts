import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAxiosResponse, request } from '../../utils/axios';
import * as consts from './login.constant';

export interface ILoginLink {
  url: string;
}

export const getLoginLink = createAsyncThunk(consts.GET_LOGIN_LINK, async (): Promise<IAxiosResponse> => {
  const res: IAxiosResponse = await request.get(
    'auth/login-link?redirect_uri=' + encodeURIComponent(window.location.origin + '/authorize'),
  );
  return res;
});

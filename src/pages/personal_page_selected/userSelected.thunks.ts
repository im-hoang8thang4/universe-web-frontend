import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAxiosResponse, request } from '../../utils/axios';

export const getUserSelected = createAsyncThunk(
  'user-info/getUserSelected',
  async (id: string): Promise<IAxiosResponse> => {
    return request.get(`${process.env.REACT_APP_API_BASE_URL}user/${id}`);
  },
);
export const getPostsSelected = createAsyncThunk(
  'user-info/getPostsSelected',
  async (querry: Querry): Promise<IAxiosResponse> => {
    return request.get(`${process.env.REACT_APP_API_BASE_URL}user/${querry.userId}/post?page=${querry.page}&limit=9`);
  },
);
export interface Querry {
  page: number;
  userId: string;
}

import { createAsyncThunk } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { IAxiosResponse, request } from '../../utils/axios';

export const getUserSearch = createAsyncThunk(
  'user-info/getUserSearch',
  async (querry: SearchQuerry): Promise<IAxiosResponse> => {
    return request.get(
      `${process.env.REACT_APP_API_BASE_URL}user/search?name=${querry.name}&limit=10&page=${querry.page}`,
    );
  },
);

export interface SearchQuerry {
  name: string;
  page: number;
}

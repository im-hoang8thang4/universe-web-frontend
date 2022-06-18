import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAxiosResponse, request } from '../../utils/axios';

export const updateAvatar = createAsyncThunk('user-infor/updateAvatar', async (file: any): Promise<IAxiosResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  return request.put(`${process.env.REACT_APP_API_BASE_URL}user/avatar`, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
});

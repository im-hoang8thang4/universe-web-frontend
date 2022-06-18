import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAxiosResponse, request } from '../../utils/axios';
import { UploadPost } from './create-post';

export const uploadFiles = createAsyncThunk(
  'user-infor/uploadFiles',
  async (files: File[]): Promise<IAxiosResponse> => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return request.post(`${process.env.REACT_APP_API_BASE_URL}attachment/batch-upload`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  },
);

export const uploadPost = createAsyncThunk(
  'user-infor/uploadPost',
  async (data: UploadPost): Promise<IAxiosResponse> => {
    return request.post(`${process.env.REACT_APP_API_BASE_URL}post`, data);
  },
);

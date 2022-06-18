import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAxiosResponse, request } from '../../utils/axios';

export const getNotifications = createAsyncThunk('notice/getNotifications', async (): Promise<IAxiosResponse> => {
  return request.get('/notification');
});

export const markAllAsRead = createAsyncThunk('notice/markAllAsRead', async (): Promise<IAxiosResponse> => {
  return request.patch('/notification/read-all');
});

export const markAsReadById = createAsyncThunk('notice/markAsReadById', async (id: string): Promise<IAxiosResponse> => {
  return request.patch('/notification/' + id);
});

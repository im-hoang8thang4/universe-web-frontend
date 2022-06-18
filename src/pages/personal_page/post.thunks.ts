import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAxiosResponse, request } from '../../utils/axios';

export const getPosts = createAsyncThunk('user-posts/getPosts', async (page: number): Promise<IAxiosResponse> => {
  return request.get(`${process.env.REACT_APP_API_BASE_URL}post?page=${page}&limit=9`);
});

export const getPostById = createAsyncThunk('user-posts/getPostById', async (id: string): Promise<IAxiosResponse> => {
  return request.get(`${process.env.REACT_APP_API_BASE_URL}post/${id}`);
});

export const deletePostById = createAsyncThunk(
  'user-posts/deletePostById',
  async (id: string): Promise<IAxiosResponse> => {
    return request.delete(`${process.env.REACT_APP_API_BASE_URL}post/${id}`);
  },
);

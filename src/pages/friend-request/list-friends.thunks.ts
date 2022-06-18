import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/axios';

export const getListFriends = createAsyncThunk('user-infor/getListFriends', async () => {
  const accessToken = JSON.parse(localStorage.getItem('tokens') as string).access_token;
  const res = await request.get(process.env.REACT_APP_API_BASE_URL + 'user/friends', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
});

export const getListFriendRequets = createAsyncThunk('user-infor/getListFriendRequets', async () => {
  const accessToken = JSON.parse(localStorage.getItem('tokens') as string).access_token;
  const res = await request.get(process.env.REACT_APP_API_BASE_URL + 'user/friend-requests', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
});

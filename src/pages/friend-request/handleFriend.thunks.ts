import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/axios';
import { IFriend } from './friend.interface';

export const deleteFriend = createAsyncThunk('user-infor/deleteFriend', async (id: string) => {
  await request.delete(`${process.env.REACT_APP_API_BASE_URL}user/friends/${id}`);
  return id;
});

export const friendRequestAccept = createAsyncThunk('user-infor/friendRequest', async (info: IFriend) => {
  await request.post(`${process.env.REACT_APP_API_BASE_URL}user/friend-requests`, { friendId: `${info._id}` });
  return info;
});

export const deleteFriendRequest = createAsyncThunk('user-infor/deleteFriendRequest', async (id: string) => {
  await request.delete(`${process.env.REACT_APP_API_BASE_URL}user/friend-requests/${id}`);
  return id;
});

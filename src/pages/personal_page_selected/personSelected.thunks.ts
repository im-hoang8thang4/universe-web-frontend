import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/axios';
import { UserInfor } from '../personal_page/user.interface';

export const deleteFriendSelected = createAsyncThunk('user-infor/deleteFriendSelected', async (id: string) => {
  await request.delete(`${process.env.REACT_APP_API_BASE_URL}user/friends/${id}`);
  return id;
});

export const deleteFriendRequestSelected = createAsyncThunk(
  'user-infor/deleteFriendRequestSelected',
  async (id: string) => {
    await request.delete(`${process.env.REACT_APP_API_BASE_URL}user/friend-requests/${id}`);
    return id;
  },
);
export const deleteRequestSelected = createAsyncThunk('user-infor/deleteRequestSelected', async (id: string) => {
  await request.delete(`${process.env.REACT_APP_API_BASE_URL}user/friend-requests/${id}`);
});
export const friendRequestAcceptSelected = createAsyncThunk(
  'user-infor/friendRequestAcceptSelected',
  async (info: UserInfor) => {
    await request.post(`${process.env.REACT_APP_API_BASE_URL}user/friend-requests`, { friendId: `${info._id}` });
    return {
      _id: info._id,
      firstName: info.firstName,
      lastName: info.lastName,
      avatar: info.avatar,
    };
  },
);
export const friendRequestSelected = createAsyncThunk('user-infor/friendRequestSelected', async (id: string) => {
  await request.post(`${process.env.REACT_APP_API_BASE_URL}user/friend-requests`, { friendId: `${id}` });
});

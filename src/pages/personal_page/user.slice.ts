import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AXIOS_RESPONSE_TYPE, request } from '../../utils/axios';
import { updateUserInfor } from '../edit_information/userUpdate.thunk';
import { updateAvatar } from '../edit_information/userUpdateAvatar.thunks';
import { IFriend } from '../friend-request/friend.interface';
import { deleteFriend, deleteFriendRequest, friendRequestAccept } from '../friend-request/handleFriend.thunks';
import { getListFriendRequets, getListFriends } from '../friend-request/list-friends.thunks';
import {
  deleteFriendRequestSelected,
  deleteFriendSelected,
  friendRequestAcceptSelected,
} from '../personal_page_selected/personSelected.thunks';
import { UserInfor } from './user.interface';

export const getUserInfor = createAsyncThunk('user-infor/getUserInfor', async () => {
  const res = await request.get(process.env.REACT_APP_API_BASE_URL + 'user');
  return res.data;
});

const userSlice = createSlice({
  name: 'user-infor',
  initialState: {
    userInfor: {} as UserInfor,
    gotUser: false,
    gotFriendsList: false,
    listFriend: [] as IFriend[],
    gotFriendRequests: false,
    listFriendRequets: [] as IFriend[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfor.fulfilled, (state, action) => {
        state.userInfor = action.payload;
        state.gotUser = true;
      })
      .addCase(getListFriends.fulfilled, (state, action) => {
        state.listFriend = action.payload;
        state.gotFriendsList = true;
      })
      .addCase(getListFriendRequets.fulfilled, (state, action) => {
        state.listFriendRequets = action.payload;
        state.gotFriendRequests = true;
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        const friendId = action.payload;
        state.listFriend = state.listFriend.filter((friend) => friend._id !== friendId);
      })
      .addCase(deleteFriendRequest.fulfilled, (state, action) => {
        const friendRequestId = action.payload;
        state.listFriendRequets = state.listFriendRequets.filter((request) => request._id !== friendRequestId);
      })
      .addCase(friendRequestAccept.fulfilled, (state, action) => {
        const friendRequestId = action.payload._id;
        state.listFriendRequets = state.listFriendRequets.filter((request) => request._id !== friendRequestId);
        state.listFriend.unshift(action.payload);
      })
      .addCase(updateUserInfor.fulfilled, (state, action) => {
        if (action.payload.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
          state.userInfor = { ...state.userInfor, ...action.payload.data };
        }
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        if (action.payload.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
          state.userInfor.avatar = action.payload.data;
        }
      })
      .addCase(deleteFriendSelected.fulfilled, (state, action) => {
        const friendId = action.payload;
        state.listFriend = state.listFriend.filter((friend) => friend._id !== friendId);
      })

      .addCase(friendRequestAcceptSelected.fulfilled, (state, action) => {
        const friendRequestId = action.payload._id;
        state.listFriendRequets = state.listFriendRequets.filter((request) => request._id !== friendRequestId);
        state.listFriend.unshift(action.payload);
      })
      .addCase(deleteFriendRequestSelected.fulfilled, (state, action) => {
        const friendRequestId = action.payload;
        state.listFriendRequets = state.listFriendRequets.filter((request) => request._id !== friendRequestId);
      });
  },
});

export const userReducer = userSlice.reducer;

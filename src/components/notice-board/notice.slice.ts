import { createSlice } from '@reduxjs/toolkit';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import { INotification } from './notice.interface';
import { getNotifications, markAllAsRead, markAsReadById } from './notice.thunk';

const noticeSlice = createSlice({
  name: 'notice',
  initialState: {
    notifications: [] as INotification[],
    gotNotifications: false,
    hasNewNoti: false,
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.hasNewNoti = true;
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((noti) => {
        noti.read = true;
      });
      state.hasNewNoti = false;
    },
    markAsReadById: (state, action: any) => {
      const id = action.meta.arg;
      const noti = state.notifications.find((noti) => noti._id === id);
      if (noti) {
        noti.read = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.fulfilled, (state, action) => {
        if (action.payload.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
          if (state.notifications.length) {
            state.notifications = action.payload.data.concat(state.notifications);
          } else state.notifications = action.payload.data;
          state.notifications.some((noti) => !noti.read) && (state.hasNewNoti = true);
          state.gotNotifications = true;
        }
      })
      .addCase(markAllAsRead.fulfilled, (state, action) => {
        if (action.payload.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
          noticeSlice.caseReducers.markAllAsRead(state);
        }
      })
      .addCase(markAsReadById.fulfilled, (state, action: any) => {
        if (action.payload.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
          noticeSlice.caseReducers.markAsReadById(state, action);
        }
      });
  },
});

export const { addNotification } = noticeSlice.actions;

export const noticeReducer = noticeSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import { noticeReducer } from '../components/notice-board/notice.slice';
import { chatReducer } from '../pages/chat/chat.slice';
import { loginReducer } from '../pages/login/login.slice';
import { userReducer } from '../pages/personal_page/user.slice';

export const STORE = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    chat: chatReducer,
    notice: noticeReducer,
  },
});

export type RootState = ReturnType<typeof STORE.getState>;

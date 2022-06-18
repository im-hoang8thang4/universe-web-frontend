import { createSlice } from '@reduxjs/toolkit';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import { IChatBoxList } from './chat.interface';
import { getAttachmentsByChatBoxId, getChatBoxList } from './chat.thunk';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    gotChatBoxList: false,
    chatBoxList: [] as IChatBoxList,
  },
  reducers: {
    onMessage: (state, action) => {
      const { chatBoxId, message } = action.payload;
      const chatBox = state.chatBoxList.find((c) => c._id === chatBoxId);
      if (chatBox) {
        chatBox.messages.push(message);
        chatBox.lastMessageAt = message.time;
        if (message.type === 'file' && chatBox.attachments !== undefined) {
          chatBox.attachments.unshift(message);
        }
      }
      state.chatBoxList.sort((a: any, b: any) => {
        return b.lastMessageAt.localeCompare(a.lastMessageAt);
      });
    },
    loadMore: (state, action) => {
      const { chatBoxId, messages } = action.payload;
      const chatBox = state.chatBoxList.find((c) => c._id === chatBoxId);
      if (chatBox) {
        messages.sort((a: any, b: any) => a.time.localeCompare(b.time));
        chatBox.messages = messages.concat(chatBox.messages);
      }
    },
    loadMoreAttachments: (state, action: any) => {
      const { chatBoxId } = action.meta.arg;
      const { data } = action.payload;
      const chatBox = state.chatBoxList.find((c) => c._id === chatBoxId);
      if (chatBox) {
        data.sort((a: any, b: any) => b.time.localeCompare(a.time));
        if (chatBox.attachments === undefined) {
          chatBox.attachments = data;
        } else chatBox.attachments = data.concat(chatBox.attachments);
      }
    },
    removeChatBox: (state, action) => {
      const { chatBoxId } = action.payload;
      state.chatBoxList = state.chatBoxList.filter((c) => c._id !== chatBoxId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatBoxList.fulfilled, (state, action) => {
        if (action.payload.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
          state.chatBoxList = action.payload.data;
          state.gotChatBoxList = true;
        }
      })
      .addCase(getAttachmentsByChatBoxId.fulfilled, (state, action) => {
        if (action.payload.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
          const { chatBoxId, type } = action.meta.arg;
          const { data } = action.payload;
          const chatBox = state.chatBoxList.find((c) => c._id === chatBoxId);
          if (chatBox) {
            data.sort((a: any, b: any) => b.time.localeCompare(a.time));
            if (type === 'init') {
              chatBox.attachments = data;
            }
            if (type === 'loadMore') {
              chatBox.attachments = chatBox.attachments && chatBox.attachments.concat(data);
            }
          }
        }
      });
  },
});

export const { onMessage, loadMore } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;

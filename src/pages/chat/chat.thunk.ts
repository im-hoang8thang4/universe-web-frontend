import { createAsyncThunk } from '@reduxjs/toolkit';
import { IQueryFilter } from '../../interfaces';
import { AXIOS_RESPONSE_TYPE, IAxiosResponse, request } from '../../utils/axios';

export const getChatBoxList = createAsyncThunk('chat/getChatBoxList', async (): Promise<IAxiosResponse> => {
  return request.get('chat');
});

export const createChatBox = createAsyncThunk(
  'chat/createChatBox',
  async (friendId: string, thunkAPI): Promise<IAxiosResponse> => {
    const dispatch = thunkAPI.dispatch;
    const res: IAxiosResponse = await request.post('chat', {
      participants: [friendId],
    });
    if (res.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
      dispatch(getChatBoxList());
    }
    return res;
  },
);

export const getMessagesByChatBoxId = createAsyncThunk(
  'chat/getMessagesByChatBoxId',
  async ({ chatBoxId, query }: { chatBoxId: string; query?: IQueryFilter }): Promise<IAxiosResponse> => {
    return request.get('chat/' + chatBoxId + '/messages', { params: query });
  },
);

export const getAttachmentsByChatBoxId = createAsyncThunk(
  'chat/getAttachmentsByChatBoxId',
  async ({
    type,
    chatBoxId,
    query,
  }: {
    type: 'init' | 'loadMore';
    chatBoxId: string;
    query?: IQueryFilter;
  }): Promise<IAxiosResponse> => {
    return request.get('chat/' + chatBoxId + '/attachments', { params: query });
  },
);

export const removeChatBox = createAsyncThunk(
  'chat/removeChatBox',
  async (chatBoxId: string): Promise<IAxiosResponse> => {
    return request.delete('chat/' + chatBoxId);
  },
);

export const uploadFiles = createAsyncThunk('chat/uploadFiles', async (files: FileList): Promise<IAxiosResponse> => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  return request.post(`${process.env.REACT_APP_API_BASE_URL}attachment/batch-upload`, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
});

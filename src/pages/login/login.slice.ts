import { createSlice } from '@reduxjs/toolkit';
import { IErorr, ITokens } from '../../interfaces';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import { getLoginLink, ILoginLink } from './login.thunk';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: {} as IErorr,
    data: {} as ILoginLink,
    tokens: {} as ITokens,
  },
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
    removeTokens: (state) => {
      state.tokens = {} as ITokens;
      localStorage.removeItem('tokens');
    },
  },
  extraReducers(builder) {
    builder.addCase(getLoginLink.fulfilled, (state, action) => {
      switch (action.payload.type) {
        case AXIOS_RESPONSE_TYPE.SUCCESS:
          state.data = action.payload.data;
          break;

        case AXIOS_RESPONSE_TYPE.ERROR:
          state.error = action.payload.data;
          break;
      }
    });
  },
});

export const { setTokens, removeTokens } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;

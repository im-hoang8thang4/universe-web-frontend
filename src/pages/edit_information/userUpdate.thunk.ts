import { createAsyncThunk } from '@reduxjs/toolkit';
import { AXIOS_RESPONSE_TYPE, IAxiosResponse, request } from '../../utils/axios';
import { UserInfor } from '../personal_page/user.interface';

export const updateUserInfor = createAsyncThunk(
  'user-infor/updateUserInfor',
  async (info: UserInfor): Promise<IAxiosResponse> => {
    const result: IAxiosResponse = await request.patch(process.env.REACT_APP_API_BASE_URL + 'user', {
      nickname: info.nickname,
      firstName: info.firstName,
      lastName: info.lastName,
      bio: info.bio,
      address: info.address,
      hobbies: [...info.hobbies],
      works: [...info.works],
      relationship: info.relationship,
      education: [...info.education],
      birthday: info.birthday,
      phone: info.phone,
      gender: info.gender,
    });
    if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
      return {
        ...result,
        type: result.type,
        data: info,
      };
    }
    return result;
  },
);

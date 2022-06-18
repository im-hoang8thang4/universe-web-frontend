import { IAxiosResponse, request } from '../../utils/axios';

export const getTokens = async (code: string): Promise<IAxiosResponse> => {
  const res: IAxiosResponse = await request.post('auth/verify', {
    code,
    redirectUri: window.location.origin + '/authorize',
  });
  return res;
};

import { IAxiosResponse, request } from '../../utils/axios';

export const postReact = async (id: string): Promise<IAxiosResponse> => {
  return request.post(`${process.env.REACT_APP_API_BASE_URL}post/${id}/react`);
};
export const deleteReact = async (id: string): Promise<IAxiosResponse> => {
  return request.delete(`${process.env.REACT_APP_API_BASE_URL}post/${id}/react`);
};

import { IAxiosResponse, request } from '../../utils/axios';

export const postComment = async (id: string, content: string): Promise<IAxiosResponse> => {
  return request.post(
    `${process.env.REACT_APP_API_BASE_URL}post/${id}/comment`,
    {
      content,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const postReplyComment = async (id: string, content: string): Promise<IAxiosResponse> => {
  return request.post(
    `${process.env.REACT_APP_API_BASE_URL}comment/${id}/reply`,
    {
      content,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export const deleteComment = async (id: string): Promise<IAxiosResponse> => {
  return request.delete(`${process.env.REACT_APP_API_BASE_URL}comment/${id}`);
};

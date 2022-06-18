import { Attachment } from '../personal_page/user.interface';

export interface IFriend {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: Attachment;
}

export interface ListFriendProps {
  info: IFriend;
}

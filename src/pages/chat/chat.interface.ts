import { Attachment, UserInfor } from '../personal_page/user.interface';

export interface IMessage {
  _id: string;
  type: 'text' | 'file';
  from: UserInfor;
  time: string;
  content: string;
  attachments: Attachment[];
}

export interface IChatBox {
  _id: string;
  participants: UserInfor[];
  messages: IMessage[];
  attachments?: IMessage[];
  lastMessageAt: string;
}

export type IChatBoxList = IChatBox[];

export interface ISendMessage {
  to: string;
  message: ISendMessageItem;
}

export interface ISendMessageItem {
  type: 'text' | 'file';
  content?: string;
  attachments?: string[];
  from?: UserInfor;
  time?: string;
}

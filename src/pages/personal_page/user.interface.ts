export interface UserInfor {
  firstName: string;
  lastName: string;
  nickname: string;
  _id: string;
  address: string;
  avatar: Attachment;
  bio: string;
  incomingFriendRequests: string[];
  birthday: string;
  education: string[];
  gender: string;
  hobbies: string[];
  phone: string;
  relationship: string;
  works: string[];
  relation_status: string;
  posts: Post[];
  friends: string[];
  number_of_friends: number;
  number_of_posts: number;
}
export interface BioUserProps {
  user: UserInfor;
}
export interface Attachment {
  _id: string;
  mimetype?: string;
  originalName?: string;
  size?: number;
}
export interface Post {
  reacted: Boolean;
  _id: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: {
      _id: string;
      mimetype: string;
    };
  };
  createdAt: string;
  content: string;
  attachments: [
    {
      _id: string;
      mimetype: string;
    },
  ];
  taggedUsers: TaggedUser[];
  reactions: TaggedUser[];
  comments: Comment[];
  privacy: string;
  totalComments: number;
  reacts: number;
}

export interface MediaProps {
  attachment: Attachment;
  css?: string;
}
export interface PostHoverPersonalProps {
  post: Post;
}

export interface Comment {
  _id: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: Attachment;
  };
  createdAt: string;
  post: string;
  content: string;
  replies: Comment[];
}
export interface SinglePostProps {
  detail: Post;
}
export interface ListCommentProps {
  listComment: Comment[];
  state: Post;
  setState: React.Dispatch<React.SetStateAction<Post>>;
}
export interface CommentProps {
  detail: Comment;
  setState: React.Dispatch<React.SetStateAction<Comment[]>>;
  state: Comment[];
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface TaggedUser {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: Attachment;
}

export enum NOTIFICATION_ACTIONS {
  REACT_TO_POST = 'react_to_post',
  ACCEPT_FRIEND_REQUEST = 'accept_friend_request',
  SEND_FRIEND_REQUEST = 'send_friend_request',
  TAG_IN_POST = 'tag_in_post',
  COMMENT_ON_POST = 'comment_on_post',
  REPLY_ON_COMMENT = 'reply_on_comment',
  SEND_MESSAGE = 'send_message',
}

export const NOTIFICATION_CONTEXT: Record<NOTIFICATION_ACTIONS, (...args: any[]) => any> = {
  [NOTIFICATION_ACTIONS.REACT_TO_POST]: (actor?: string): JSX.Element => {
    return (
      <span>
        <strong>{actor || 'Someone'}</strong> reacted to your post
      </span>
    );
  },
  [NOTIFICATION_ACTIONS.ACCEPT_FRIEND_REQUEST]: (actor?: string) => {
    return (
      <span>
        <strong>{actor || 'Someone'}</strong> accepted your friend request
      </span>
    );
  },
  [NOTIFICATION_ACTIONS.SEND_FRIEND_REQUEST]: (actor?: string) => {
    return (
      <span>
        <strong>{actor || 'Someone'}</strong> sent you a friend request
      </span>
    );
  },
  [NOTIFICATION_ACTIONS.TAG_IN_POST]: (actor?: string) => {
    return (
      <span>
        <strong>{actor || 'Someone'}</strong> tagged you in a post
      </span>
    );
  },
  [NOTIFICATION_ACTIONS.COMMENT_ON_POST]: (actor?: string) => {
    return (
      <span>
        <strong>{actor || 'Someone'}</strong> commented on your post
      </span>
    );
  },
  [NOTIFICATION_ACTIONS.REPLY_ON_COMMENT]: (actor?: string) => {
    return (
      <span>
        <strong>{actor || 'Someone'}</strong> replied on your comment
      </span>
    );
  },
  [NOTIFICATION_ACTIONS.SEND_MESSAGE]: (actor?: string) => {
    return (
      <span>
        <strong>{actor || 'Someone'}</strong> sent you a message
      </span>
    );
  },
};

export interface INotification {
  action: NOTIFICATION_ACTIONS;
  actor: {
    avatar: string;
    firstName: string;
    lastName: string;
    _id: string;
  };
  contentId: string;
  target?: string;
  read?: boolean;
  createdAt: string;
  _id: string;
}

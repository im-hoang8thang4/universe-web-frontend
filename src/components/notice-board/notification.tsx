import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/img/user.png';
import { timeSince } from '../../utils/helpers';
import { INotification, NOTIFICATION_ACTIONS, NOTIFICATION_CONTEXT } from './notice.interface';
import './notification.css';

export interface INotificationProps {
  notification: INotification;
  onClick?: () => void;
}

export const Notification = (props: INotificationProps) => {
  const navigate = useNavigate();

  const onClickNoti = () => {
    switch (props.notification.action) {
      case NOTIFICATION_ACTIONS.ACCEPT_FRIEND_REQUEST:
      case NOTIFICATION_ACTIONS.SEND_FRIEND_REQUEST:
        window.location.href = '/' + props.notification.contentId;
        break;

      case NOTIFICATION_ACTIONS.REACT_TO_POST:
      case NOTIFICATION_ACTIONS.COMMENT_ON_POST:
      case NOTIFICATION_ACTIONS.REPLY_ON_COMMENT:
      case NOTIFICATION_ACTIONS.TAG_IN_POST:
        window.location.href = `/post-detail/${props.notification.contentId}`;
        break;

      case NOTIFICATION_ACTIONS.SEND_MESSAGE:
        navigate(`/direct/${props.notification.contentId}`);
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={props.notification.read ? 'notification read' : 'notification'}
      onClick={() => {
        onClickNoti();
        props.onClick && props.onClick();
      }}
    >
      <div className="flex gap-1 mr-2">
        <div className="w-9 h-9 rounded-full">
          <img
            src={
              props.notification.actor.avatar
                ? `${process.env.REACT_APP_API_BASE_URL}attachment/${props.notification.actor.avatar}`
                : defaultAvatar
            }
            alt="hihi"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <div>
        <p className="font-normal text-sm">
          {NOTIFICATION_CONTEXT[props.notification.action](
            (props.notification.actor.firstName + ' ' + props.notification.actor.lastName).trim(),
          )}
        </p>
        <span className="text-sm">{timeSince(new Date(props.notification.createdAt))}</span>
      </div>
    </div>
  );
};

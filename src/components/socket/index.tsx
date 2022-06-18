import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { onMessage } from '../../pages/chat/chat.slice';
import { RootState } from '../../store/redux';
import { INotification, NOTIFICATION_ACTIONS } from '../notice-board/notice.interface';
import { addNotification } from '../notice-board/notice.slice';
import { Notification } from '../notice-board/notification';

export const SocketContext = createContext(
  {} as {
    CHAT_SOCKET: Socket;
    NOTIFICATIONS_SOCKET: Socket;
  },
);

export const SocketProvider = (props: any) => {
  const loginState = useSelector((state: RootState) => state.login.tokens);
  const dispatch = useDispatch();
  const [CHAT_SOCKET, setCHAT_SOCKET] = useState({} as Socket);
  const [NOTIFICATIONS_SOCKET, setNOTIFICATIONS_SOCKET] = useState({} as Socket);
  const [notification, setShowNotify] = useState(undefined as INotification | undefined);

  const handleShowNotifi = (notification: INotification) => {
    setShowNotify(notification);
    setTimeout(() => {
      setShowNotify(undefined);
    }, 5000);
  };

  useEffect(() => {
    if (loginState.access_token) {
      const socketConfig = {
        extraHeaders: {
          Authorization: `Bearer ${loginState.access_token}`,
        },
      };

      /**
       * Chat socket
       */
      const CHAT_SOCKET = io(process.env.REACT_APP_API_BASE_URL as string, {
        ...socketConfig,
        path: '/chat-ws',
      });
      CHAT_SOCKET.on('general', (data) => {
        console.log('Chat socket', data);
      });
      CHAT_SOCKET.on('message', (data: any) => {
        console.log('message', data);
        dispatch(onMessage({ chatBoxId: data.to, message: data.message }));
        handleShowNotifi({
          _id: 'sendMessageId',
          action: NOTIFICATION_ACTIONS.SEND_MESSAGE,
          actor: {
            _id: (data?.message?.from?._id && data.message.from._id) || '',
            avatar: (data?.message?.from?.avatar && data.message.from.avatar) || '',
            firstName: (data?.message?.from?.firstName && data.message.from.firstName) || '',
            lastName: (data?.message?.from?.lastName && data.message.from.lastName) || '',
          },
          contentId: data.to,
          createdAt: new Date().toISOString(),
        });
      });
      CHAT_SOCKET.on('sent', (data) => {
        console.log('sent', data);
        dispatch(onMessage({ chatBoxId: data.to, message: data.message }));
      });
      setCHAT_SOCKET(CHAT_SOCKET);

      /**
       * Notification socket
       */
      const NOTIFICATIONS_SOCKET = io(process.env.REACT_APP_API_BASE_URL as string, {
        ...socketConfig,
        path: '/notification-ws',
      });
      NOTIFICATIONS_SOCKET.on('general', (data) => {
        console.log('Notification socket', data);
      });
      NOTIFICATIONS_SOCKET.on('notification', (data: INotification) => {
        console.log(data);
        dispatch(addNotification(data));
        handleShowNotifi(data);
      });
      setNOTIFICATIONS_SOCKET(NOTIFICATIONS_SOCKET);
    }
  }, [loginState, dispatch]);
  return (
    <SocketContext.Provider
      value={{
        CHAT_SOCKET,
        NOTIFICATIONS_SOCKET,
      }}
    >
      {props.children}
      {notification && <Notification onClick={() => setShowNotify(undefined)} notification={notification} />}
    </SocketContext.Provider>
  );
};

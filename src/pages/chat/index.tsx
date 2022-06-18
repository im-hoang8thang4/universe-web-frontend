import { useContext, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEditAlt, BiSend, BiX } from 'react-icons/bi';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { IoImageOutline, IoImagesOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import { SyncLoader } from 'react-spinners';
import ReactTextareaAutosize from 'react-textarea-autosize';
import tenLua from '../../assets/img/tenLua.png';
import defaultAvatar from '../../assets/img/user.png';
import MediaCustom from '../../components/media/media-custom';
import { ConfirmPopup, Popup } from '../../components/popup';
import { SocketContext } from '../../components/socket';
import Spinner from '../../components/spinner/spinner';
import { RootState, STORE } from '../../store/redux';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import { sliceString, timeSince, toastNotify } from '../../utils/helpers';
import { getListFriends } from '../friend-request/list-friends.thunks';
import { Attachment, UserInfor } from '../personal_page/user.interface';
import { getUserInfor } from '../personal_page/user.slice';
import './chat.css';
import { IChatBox, IMessage, ISendMessageItem } from './chat.interface';
import { loadMore } from './chat.slice';
import {
  getAttachmentsByChatBoxId,
  getChatBoxList,
  getMessagesByChatBoxId,
  removeChatBox,
  uploadFiles,
} from './chat.thunk';

export const Chat = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chatState = useSelector((state: RootState) => state.chat);
  const userState = useSelector((state: RootState) => state.user);
  const boxId = useParams().boxId;
  const [currentBoxChat, setCurrentBoxChat] = useState(undefined as IChatBox | undefined);
  const [showIndex, setShowIndex] = useState(-1);

  const changeShowIndex = (index: number) => {
    setShowIndex(index);
  };

  useEffect(() => {
    if (!userState.gotFriendsList) dispatch(getListFriends());
    if (!userState.gotUser) dispatch(getUserInfor());
    if (!chatState.gotChatBoxList) {
      dispatch(getChatBoxList());
    }
  });

  useEffect(() => {
    if (boxId && chatState.gotChatBoxList) {
      const currentChat = chatState.chatBoxList.find((item) => item._id === boxId);
      if (currentChat) {
        setCurrentBoxChat(currentChat);
      } else navigate('/direct', { replace: true });
    }
  }, [boxId, chatState.chatBoxList, chatState.gotChatBoxList, navigate]);

  const [openMessage, setOpenMessage] = useState(false);
  const [popup, setPopup] = useState(<></>);
  const sendMessagePopup = () => <Popup friends={userState.listFriend} handlePopup={() => setPopup(<></>)} />;

  return userState.gotUser && chatState.gotChatBoxList ? (
    <div className="chatBox">
      {popup}
      <div className="chatBox_child">
        <div className={'listItems ' + (openMessage ? 'hide' : '')}>
          <div className="headList">
            <div className="image">
              <img
                src={
                  userState.userInfor.avatar
                    ? `${process.env.REACT_APP_API_BASE_URL}attachment/${userState.userInfor.avatar._id}`
                    : defaultAvatar
                }
                width={40}
                height={40}
                alt="logo"
              />
            </div>
            <div className="userName">
              <span>{sliceString(userState.userInfor.firstName + ' ' + userState.userInfor.lastName, 20)}</span>
            </div>
            <div className="addMessage">
              <button onClick={() => setPopup(sendMessagePopup)}>
                <BiEditAlt fontSize={27} />
              </button>
            </div>
          </div>
          <div className="bodyList">
            <div className="listNameItems">
              {chatState.chatBoxList.map((item: IChatBox, i: number) => {
                const targetUser = item.participants.find((user: any) => user._id !== userState.userInfor._id);
                return (
                  <div
                    className={item._id === currentBoxChat?._id ? 'chat_item active' : 'chat_item'}
                    key={i}
                    onClick={() => {
                      setOpenMessage(true);
                      setShowIndex((item?.messages?.length || 1) - 1);
                      navigate('/direct/' + item._id);
                    }}
                  >
                    <div className="chat_item_avt">
                      <div className="image">
                        <img
                          src={
                            targetUser?.avatar
                              ? `${process.env.REACT_APP_API_BASE_URL}attachment/${targetUser.avatar._id}`
                              : defaultAvatar
                          }
                          width={50}
                          height={50}
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <div className="content">
                      <div className="name_item">
                        <span>
                          {sliceString(
                            targetUser ? targetUser?.firstName + ' ' + targetUser?.lastName : 'Unknown user',
                            20,
                          )}
                        </span>
                      </div>
                      <div className="content_text_time">
                        {(item?.messages?.length && (
                          <span className="content_text">
                            {sliceString(
                              targetUser?._id !== item.messages[item.messages.length - 1].from._id
                                ? 'You: ' + item.messages[item.messages.length - 1].content
                                : item.messages[item.messages.length - 1].content,
                              18,
                            )}
                          </span>
                        )) || <></>}
                        <div className="content_time">
                          {(item?.messages?.length && (
                            <span>{timeSince(new Date(item.messages[item.messages.length - 1].time))}</span>
                          )) || <></>}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={'chat_with_friend ' + (openMessage ? '' : 'hide')}>
          {boxId && currentBoxChat ? (
            <MessageOfFriend
              showIndex={showIndex}
              setShowIndex={changeShowIndex}
              chatBox={currentBoxChat}
              handleOutMes={() => setOpenMessage(false)}
            />
          ) : (
            <AddMessage
              handlePopup={() => {
                setPopup(sendMessagePopup());
              }}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export const AddMessage = (props: { handlePopup: () => void }) => {
  return (
    <div className="addMes">
      <div className="addMes_item">
        <div className="new_mes_logo">
          <img src={tenLua} alt="icon" width={220} height={220} />
        </div>
        <div className="content">
          <p>Gửi ảnh và tin nhắn riêng tư cho bạn bè </p>
          <button onClick={() => props.handlePopup()} className="isButton">
            Gửi tin nhắn
          </button>
        </div>
      </div>
    </div>
  );
};

const SendMessageContainer = (props: { sendMessage: (message: ISendMessageItem) => void }) => {
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch<typeof STORE.dispatch>();

  const handleUploadFiles = async (files: FileList) => {
    setUploading(true);
    const res = await dispatch(uploadFiles(files)).unwrap();
    if (res.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
      props.sendMessage({
        type: 'file',
        attachments: res.data.attachments.map((a: Attachment) => a._id),
        content: 'Sent attachments',
      });
    } else {
      toastNotify(res);
    }
    setUploading(false);
  };

  const handleSendMessage = () => {
    if (msg.trim()) {
      props.sendMessage({
        type: 'text',
        content: msg.trim(),
      });
    }
    setMsg('');
  };

  return (
    <div className="body_send">
      <div className="body_send_child">
        <div className="button_send_media">
          <button>
            {!uploading ? (
              <>
                <label htmlFor="upload_file">
                  <IoImageOutline fontSize={25} />
                  <input
                    id="upload_file"
                    type={'file'}
                    name="files[]"
                    multiple
                    style={{ display: 'none' }}
                    accept={'image/*, video/*'}
                    onChange={(e) => {
                      if (e.target.files?.length) {
                        handleUploadFiles(e.target.files);
                      }
                    }}
                  />
                </label>
              </>
            ) : (
              <SyncLoader size={4} />
            )}
          </button>
        </div>
        <div className="text_input">
          <ReactTextareaAutosize
            placeholder="Type message here..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            maxRows={3}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
        </div>
        <button>
          <BiSend onClick={handleSendMessage} fontSize={25} />
        </button>
      </div>
    </div>
  );
};

const ViewMessages = (props: { chatBox: IChatBox; currentMessageView: number; userInfo: UserInfor }) => {
  const currentMessageView =
    props.currentMessageView !== -1 ? props.currentMessageView : props.chatBox.messages.length - 1;

  useEffect(() => {
    scroller.scrollTo('scrollElement', {
      containerId: 'body_content',
    });
  });

  const renderMessage = (messages: IMessage[]): React.ReactNode => {
    const nodes = [] as React.ReactNode[];
    for (let i = 0; i < messages.length; i++) {
      let temp = 0;
      const tempNode = [] as React.ReactNode[];
      while (temp + i < messages.length && messages[i].from._id === messages[i + temp].from._id) {
        if (messages[i + temp].type === 'text') {
          tempNode.push(
            i + temp === currentMessageView ? (
              <div key={i + temp} className="text">
                <p>{messages[i + temp].content}</p>
                <Element name="scrollElement"></Element>
              </div>
            ) : (
              <div key={i + temp} className="text">
                <p>{messages[i + temp].content}</p>
              </div>
            ),
          );
        } else if (messages[i + temp].type === 'file') {
          tempNode.push(
            i + temp === currentMessageView ? (
              <div key={i + temp} className="text">
                {messages[i + temp].attachments.map((a: Attachment, j) => (
                  <MediaCustom key={j} attachment={a} />
                ))}
                <Element name="scrollElement"></Element>
              </div>
            ) : (
              <div key={i + temp} className="text">
                {messages[i + temp].attachments.map((a: Attachment, j) => (
                  <MediaCustom key={j} attachment={a} />
                ))}
              </div>
            ),
          );
        }
        temp++;
      }
      nodes.push(
        messages[i].from._id === props.userInfo._id ? (
          <div key={i} className="message_of_user">
            {tempNode}
          </div>
        ) : (
          <div key={i} className="message_of_friend">
            {tempNode}
          </div>
        ),
      );
      i += temp - 1;
    }
    return nodes;
  };

  return <div>{(props.chatBox?.messages.length && renderMessage(props.chatBox?.messages)) || <></>}</div>;
};

interface IMessageOfFriend {
  handleOutMes: () => void;
  chatBox: IChatBox;
  showIndex: number;
  setShowIndex: (index: number) => void;
}

export const MessageOfFriend = (props: IMessageOfFriend) => {
  const [openInformation, setOpenInformation] = useState(false);
  const dispatch = useDispatch<typeof STORE.dispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfor);
  const chatSocket = useContext(SocketContext).CHAT_SOCKET;
  const { chatBox, handleOutMes, showIndex, setShowIndex } = props;
  const targetUser = chatBox.participants.find((p) => p._id !== userInfo._id);
  const [loading, setLoading] = useState(false);
  const [loadedAllMessages, setLoadedAllMessages] = useState(false);

  useEffect(() => {
    setLoadedAllMessages(false);
  }, [chatBox]);

  useEffect(() => {
    if (chatSocket.connected) {
      chatSocket.on('sent', () => setShowIndex(chatBox.messages.length - 1));
      chatSocket.on('message', () => setShowIndex(chatBox.messages.length - 1));
    }
  }, [chatSocket, chatBox, setShowIndex]);

  const sendMessage = (boxId: string) => {
    return (message: ISendMessageItem) => {
      chatSocket.emit('send', {
        to: boxId,
        message,
      });
    };
  };

  const handleLoadMore = async (limit = 10) => {
    const messages = await dispatch(
      getMessagesByChatBoxId({
        chatBoxId: chatBox._id,
        query: {
          before: chatBox.messages.length ? chatBox.messages[0].time : Date.now().toString(),
          limit,
        },
      }),
    ).unwrap();
    if (messages.data.length === 0) {
      setLoadedAllMessages(true);
    }
    if (messages.type === AXIOS_RESPONSE_TYPE.SUCCESS && messages.data.length) {
      dispatch(loadMore({ chatBoxId: chatBox._id, messages: messages.data }));
      setShowIndex(limit);
    }
  };

  return !openInformation ? (
    <div className="chatBox_open">
      <div className="chatBox_open__head">
        <div className="avt_name">
          <button className="out_chatBox_open">
            <HiOutlineChevronLeft onClick={handleOutMes} fontSize={23} />
          </button>
          <div className="avatar">
            <img
              src={
                targetUser?.avatar
                  ? `${process.env.REACT_APP_API_BASE_URL}attachment/${targetUser.avatar._id}`
                  : defaultAvatar
              }
              alt="logo"
            />
          </div>
          <div className="friendName">
            <span>{targetUser ? targetUser?.firstName + ' ' + targetUser?.lastName : 'Unknown user'}</span>
          </div>
        </div>
        <button>
          <IoIosInformationCircleOutline
            onClick={() => {
              setShowIndex(chatBox.messages.length - 1);
              setOpenInformation(true);
            }}
            fontSize={27}
          />
        </button>
      </div>
      <div className="chatBox_open_body">
        <div className="content_sendMessage">
          <div
            onScroll={async (e: any) => {
              if (e.target?.scrollTop === 0) {
                e.preventDefault();
                setLoading(true);
                !loadedAllMessages && (await handleLoadMore());
                setLoading(false);
              }
            }}
            className="body_content"
            id="body_content"
          >
            {!loadedAllMessages && loading && (
              <div className="text-center py-1">
                <SyncLoader size={10} />
              </div>
            )}
            <ViewMessages chatBox={props.chatBox} userInfo={userInfo} currentMessageView={showIndex} />
          </div>
          <SendMessageContainer sendMessage={sendMessage(props.chatBox?._id)} />
        </div>
      </div>
    </div>
  ) : (
    <Media chatBoxId={props.chatBox._id} hideInfo={() => setOpenInformation(false)} />
  );
};

export const Media = (props: { hideInfo: () => void; chatBoxId: string }) => {
  const [popup, setPopup] = useState(<></>);
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof STORE.dispatch>();
  const chatBox = useSelector((state: RootState) => state.chat.chatBoxList.find((c) => c._id === props.chatBoxId));
  const [loading, setLoading] = useState(false);
  const [loadedAllMessages, setLoadedAllMessages] = useState(false);

  useEffect(() => {
    if (chatBox?.attachments === undefined && chatBox?._id) {
      dispatch(getAttachmentsByChatBoxId({ type: 'init', chatBoxId: chatBox._id }));
    }
  });

  const handleDelete = async () => {
    const res = await dispatch(removeChatBox(props.chatBoxId)).unwrap();
    if (res.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
      dispatch(getChatBoxList());
      navigate('/direct', { replace: true });
    }
  };

  const handleLoadMore = async (chatBox: IChatBox) => {
    const res = await dispatch(
      getAttachmentsByChatBoxId({
        type: 'loadMore',
        chatBoxId: chatBox._id,
        query: {
          before: chatBox.attachments?.length
            ? chatBox.attachments[chatBox.attachments.length - 1].time
            : Date.now().toString(),
        },
      }),
    ).unwrap();
    if (res.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
      if (res.data.length === 0) {
        setLoadedAllMessages(true);
      }
    }
  };

  const confirmDeletePopup = () => <ConfirmPopup onConfirm={handleDelete} popupState={() => setPopup(<></>)} />;

  return (
    (chatBox?._id && (
      <div className="chat_detail">
        <div className="chat_detail_head">
          <div className="head_title">
            <div></div>
            <span>Details</span>
            <button>
              <BiX onClick={props.hideInfo} fontSize={27} />
            </button>
          </div>
        </div>
        <div
          onScroll={async (e) => {
            e.preventDefault();
            if (e.currentTarget.scrollTop + e.currentTarget.clientHeight === e.currentTarget.scrollHeight) {
              setLoading(true);
              !loadedAllMessages && (await handleLoadMore(chatBox));
              setLoading(false);
            }
          }}
          className="chat_detail_body"
        >
          <div className="chat_detail_body_item">
            <div className="chat_detail_body_item_delete">
              <div className="delete_chat">
                <button
                  onClick={() => {
                    setPopup(confirmDeletePopup);
                  }}
                >
                  <AiOutlineDelete />
                  <div>Delete this chabox</div>
                </button>
                {popup}
              </div>
            </div>
            <div className="chat_detail_body_item_file">
              <div className="head_item">
                <div>
                  <IoImagesOutline />
                </div>
                <span>Media</span>
              </div>
              <div className="list_imgs">
                <div className="list_imgs_child">
                  <div className="img_item">
                    {chatBox?.attachments?.length ? (
                      chatBox.attachments.map((msg) =>
                        msg.attachments.map((attachment, j) => <MediaCustom key={j} attachment={attachment} />),
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                  {!loadedAllMessages && loading && (
                    <div className="text-center py-1">
                      <SyncLoader size={10} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )) || <Spinner />
  );
};

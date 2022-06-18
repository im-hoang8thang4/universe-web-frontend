import { useState } from 'react';
import { BiX } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/img/user.png';
import { createChatBox, getChatBoxList } from '../../pages/chat/chat.thunk';
import { IFriend } from '../../pages/friend-request/friend.interface';
import { STORE } from '../../store/redux';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import Spinner from '../spinner/spinner';
import './popup.css';
export interface IPopupProps {
  handlePopup: () => void;
  friends: IFriend[];
}
export const Popup = (props: IPopupProps) => {
  const dispatch = useDispatch<typeof STORE.dispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {
        <div className="popup">
          <div className="popup-overlay"></div>
          <div className="popup-card">
            <div className="popup-card__header">
              <div onClick={props.handlePopup} className="close">
                <BiX fontSize={30} />
              </div>
              <div className="card_title">
                <span>Create new message</span>
              </div>
              <div></div>
            </div>
            <div className="popup-card__body">
              {loading ? (
                <div className="h-full flex items-center">
                  <Spinner />
                </div>
              ) : (
                <div className="popup-card__list_item">
                  {props.friends.map((friend) => (
                    <div
                      key={friend._id}
                      onClick={async () => {
                        setLoading(true);
                        const res = await dispatch(createChatBox(friend._id)).unwrap();
                        if (res.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
                          await dispatch(getChatBoxList()).unwrap();
                          navigate('/direct/' + res.data.chatBoxId, { replace: true });
                        }
                        setLoading(false);
                        props.handlePopup();
                      }}
                      className="popup-card_item"
                    >
                      <div className="popup-card_item__image">
                        <img
                          src={
                            friend.avatar
                              ? `${process.env.REACT_APP_API_BASE_URL}attachment/${friend.avatar._id}`
                              : defaultAvatar
                          }
                          alt="avatar"
                        />
                      </div>
                      <div className="popup-card_item__name">
                        <span>
                          {friend.firstName} {friend.lastName}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export interface IPopupState {
  popupState: () => void;
  onConfirm: () => void;
}
export const ConfirmPopup = (props: IPopupState) => {
  return (
    <div>
      <div className="popup">
        <div className="popup-overlay"></div>
        <div className="confirm_popup-card">
          <div className="confirm_popup_head">
            <div className="popup_title">
              <span>Xóa đoạn chat?</span>
            </div>
            <div className="title_content">
              <span>Nếu bạn chọn xóa thì đoạn chat này sẽ chỉ bị gỡ khỏi hộp thư của mình bạn thôi.</span>
            </div>
          </div>
          <div className="confirm_popup_body">
            <div className="confirm_delete">
              <button onClick={props.onConfirm}>Xóa</button>
            </div>
            <div className="confirm_exit">
              <button style={{ color: 'black' }} onClick={props.popupState}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

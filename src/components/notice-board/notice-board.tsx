import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/redux';
import { markAllAsRead, markAsReadById } from './notice.thunk';
import { Notification } from './notification';

const NoticeBoard = () => {
  const noticeState = useSelector((state: RootState) => state.notice);
  const dispatch = useDispatch();

  return (
    <div className="notice-board w-80 max-h-96 flex flex-col p-2 gap-1 absolute right-6 top-14 bg-white rounded-md shadow-md md:right-16 md:top-20 xl:right-[20%] xl:top-20">
      <div className="flex border-solid border-b-[1px] border-gray-300 justify-center ">
        <button
          className="hover:underline hover:underline-solid hover:font-semibold flex gap-1 items-center pb-1"
          onClick={() => {
            dispatch(markAllAsRead());
          }}
        >
          <IoMdCheckmark /> <span>Mark all as read</span>
        </button>
      </div>
      {noticeState.notifications.map((noti, i) => (
        <Notification
          key={i}
          notification={noti}
          onClick={() => {
            dispatch(markAsReadById(noti._id));
          }}
        />
      ))}
    </div>
  );
};

export default NoticeBoard;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../assets/img/user.png';
import { RootState } from '../../store/redux';
import { ListFriendProps } from './friend.interface';
import { deleteFriend } from './handleFriend.thunks';
import { getListFriends } from './list-friends.thunks';
export const ListFriends = () => {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userState.gotFriendsList) {
      dispatch(getListFriends());
    }
  }, [dispatch, userState]);

  return (
    <div className="">
      {userState.listFriend.map((friend) => (
        <div key={friend._id}>
          <FriendElement info={friend} />
        </div>
      ))}
      {userState.listFriend.length === 0 && (
        <div className="w-full h-full flex flex-col justify-center items-center pt-5">
          <p className="text-gray-400">Empty</p>
        </div>
      )}
    </div>
  );
};

export const FriendElement = (props: ListFriendProps) => {
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const handleXoa = (id: string) => {
    dispatch(deleteFriend(id));
  };
  const handleDelete = () => {
    setPopup(true);
  };

  return (
    <>
      {popup && (
        <div
          className="flex justify-center items-center z-20"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: '#0003',
          }}
          onClick={() => {
            setPopup(false);
          }}
        >
          <div className="absolute flex flex-col bg-white rounded-md shadow-sm px-3">
            <div className="pb-6 pt-3">Are you sure to delete this friend?</div>
            <div className="w-full flex justify-center pb-3">
              <div className="flex gap-10">
                <button onClick={() => handleXoa(props.info._id)} className="flex justify-center hover:scale-110 px-4">
                  OK
                </button>
                <button
                  className="text-red-500 flex justify-center hover:scale-110"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center rounded-xl hover:bg-gray-200 hover:scale-105 duration-300 transition-all cursor-pointer pr-9">
        <Link to={`/${props.info._id}`}>
          <div className="flex items-center w-full gap-2 p-2 md:gap-5">
            <div className="w-16 h-16 md:h-[50px] md:w-[50px]">
              <img
                src={
                  props.info.avatar
                    ? `${process.env.REACT_APP_API_BASE_URL}attachment/${props.info.avatar._id}`
                    : defaultAvatar
                }
                alt="user"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <span className="font-semibold hover:decoration-solid hover:underline ">{`${props.info.firstName} ${props.info.lastName}`}</span>
            </div>
          </div>
        </Link>
        <button
          onClick={() => {
            handleDelete();
          }}
          className="hover:scale-110 duration-300 text-13 border-solid border-[2px] border-gray-200 px-2 rounded-md hover:bg-red-500 hover:font-semibold py-1"
        >
          Remove
        </button>
      </div>
    </>
  );
};

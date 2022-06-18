import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner';
import { RootState } from '../../store/redux';
import { IFriend, ListFriendProps } from './friend.interface';
import { getListFriendRequets } from './list-friends.thunks';
import defaultAvatar from '../../assets/img/user.png';
import { deleteFriendRequest, friendRequestAccept } from './handleFriend.thunks';
import { Link } from 'react-router-dom';
export const ListFriendsRequest = () => {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userState.gotFriendRequests) {
      dispatch(getListFriendRequets());
    }
  }, [dispatch, userState]);

  return userState.gotFriendRequests ? (
    <div className="w-full flex flex-col gap-3">
      {userState.listFriendRequets.map((request) => (
        <div key={request._id}>
          <FriendRequestElement info={request} />
        </div>
      ))}
      <div className="w-full h-full flex flex-col justify-center items-center pt-5">
        {!userState.listFriendRequets.length && <p className="text-gray-400">Empty</p>}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export const FriendRequestElement = (props: ListFriendProps) => {
  const dispatch = useDispatch();
  const handleAcept = (info: IFriend) => {
    dispatch(friendRequestAccept(info));
  };
  const handleDeleteAcept = (id: string) => {
    dispatch(deleteFriendRequest(id));
  };
  return (
    <div className="flex items-center w-full gap-2 p-2 md:gap-5 hover:scale-105 hover:bg-gray-200 rounded-md duration-300 transition-all">
      <Link to={`/${props.info._id}`}>
        <div className="w-16 h-16 md:h-[80px] md:w-[80px]">
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
      </Link>

      <div className="flex flex-col items-start gap-3">
        <Link to={`/${props.info._id}`}>
          <span className="font-semibold hover:underline hover:decoration-solid">{`${props.info.firstName} ${props.info.lastName}`}</span>
        </Link>
        <div className="flex gap-3 md:gap-6">
          <button
            onClick={() => handleAcept(props.info)}
            className="text-center font-semibold md:px-8 px-5 py-[5px] bg-gradient-to-r from-purple-600 to-blue-500 rounded-[12px] hover:from-pink-500 hover:to-purple-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            Accept
          </button>
          <button
            onClick={() => {
              handleDeleteAcept(props.info._id);
            }}
            className="text-center font-semibold md:px-8 px-5 py-[5px] bg-gray-300 rounded-[13px] hover:bg-gray-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

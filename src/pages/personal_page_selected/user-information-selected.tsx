import React, { useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { RiUserFollowFill, RiUserReceivedFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/img/user.png';
import { BioUser } from '../personal_page/user-information';
import { BioUserProps, UserInfor } from '../personal_page/user.interface';
import {
  deleteFriendRequestSelected,
  deleteFriendSelected,
  deleteRequestSelected,
  friendRequestAcceptSelected,
  friendRequestSelected,
} from './personSelected.thunks';

const UserInformation = (props: BioUserProps) => {
  const userInfor = props.user;
  const relationStatus = props.user.relation_status;
  const userId = props.user._id;
  return (
    <div className="flex justify-center bg-gray-50">
      <div className="flex flex-col items-start px-5 bg-gray-50 w-full border-solid border-b-[1px] border-gray-400 md:p-6 md:max-w-[975px]">
        <div className="w-full flex justify-start py-4 gap-7 items-center">
          <div className="w-20 h-20 md:w-36 md:h-36">
            <img
              src={
                userInfor.avatar
                  ? `${process.env.REACT_APP_API_BASE_URL}attachment/${userInfor.avatar._id}`
                  : defaultAvatar
              }
              className="rounded-full w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-5 ml-4 md:ml-12 w-2/3">
            <div className="flex flex-col gap-5 md:gap-10 md:flex md:flex-row">
              <div className="flex items-center flex-col md:flex-row md:gap-2">
                <p className="text-xl font-semibold text-gray-800">{`${userInfor.firstName} ${userInfor.lastName}`}</p>
                <p className="font-semibold text-gray-800">{userInfor.nickname && `(${userInfor.nickname})`}</p>
              </div>
              <ButtonInterative status={relationStatus} userId={userId} user={userInfor} />
            </div>

            <div className="hidden md:flex">
              <AnalyticsWeb user={userInfor} />
            </div>
            <div className="md:flex  hidden">
              <BioUser user={userInfor} />
            </div>
          </div>
        </div>

        <div className="md:hidden mb-10">
          <BioUser user={userInfor} />
        </div>

        <div className="md:hidden w-full">
          <AnalyticsMobile user={userInfor} />
        </div>
      </div>
    </div>
  );
};

export default UserInformation;

export const ButtonInterative = (props: any) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(props.status);
  const [popup, setPopup] = useState(false);
  const userId = props.userId;
  const user = props.user;
  const dispatch = useDispatch();
  const handleRemoveFr = async (userId: string) => {
    await dispatch(deleteFriendSelected(userId));
    setStatus('non-friend');
  };
  const handleMakeFriend = async (userId: string) => {
    await dispatch(friendRequestSelected(userId));
    setStatus('requested');
  };
  const handleAcept = async (user: UserInfor) => {
    await dispatch(friendRequestAcceptSelected(user));
    setStatus('friend');
  };
  const handleDeleteRequest = async (userId: string) => {
    await dispatch(deleteFriendRequestSelected(userId));
    setStatus('non-friend');
  };
  const handleDeleteUserRequeted = async (userId: string) => {
    await dispatch(deleteRequestSelected(userId));
    setStatus('non-friend');
  };
  const checkRelation = (status: string) => {
    switch (status) {
      case 'friend':
        return (
          <>
            {popup && (
              <div
                className="flex justify-center items-center z-40"
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
                <div className="absolute flex flex-col bg-white rounded-md shadow-sm px-3 bottom-1/2 md:bottom-2/3">
                  <div className="pb-6 pt-3">Are you sure to delete this friend?</div>
                  <div className="w-full flex justify-center pb-3">
                    <div className="flex gap-10">
                      <button
                        onClick={() => handleRemoveFr(userId)}
                        className="flex justify-center hover:scale-110 px-4"
                      >
                        Ok
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
            <button
              className="rounded-md px-4 py-1 font-bold border-solid border-[1px] border-gray-400 hover:bg-gray-300 text-gray-600"
              onClick={() => setPopup(true)}
            >
              <RiUserFollowFill />
            </button>
          </>
        );
      case 'non-friend':
        return (
          <button
            className="rounded-md px-4 py-1 font-bold border-solid border-[1px] border-gray-400 hover:bg-gray-300 text-gray-600"
            onClick={() => handleMakeFriend(userId)}
          >
            <BsFillPersonPlusFill />
          </button>
        );

      case 'requested':
        return (
          <button
            className="rounded-md px-4 py-1 font-bold border-solid border-[1px] border-gray-400 hover:bg-gray-300 text-gray-600"
            onClick={() => {
              handleDeleteUserRequeted(userId);
            }}
          >
            <RiUserReceivedFill />
          </button>
        );
      case 'pending':
        return (
          <>
            <div className="flex gap-4">
              <button
                className="text-center text-13 md:text-16 font-semibold md:px-3 px-2 py-[2px] bg-gradient-to-r from-purple-600 to-blue-500 rounded-md hover:from-pink-500 hover:to-purple-500 hover:text-white duration-300 hover:scale-105"
                onClick={() => handleAcept(user)}
              >
                Accept
              </button>

              <button
                className="text-center text-13 md:text-16 font-semibold md:px-3 px-2 py-[2px] bg-gray-300 rounded-md hover:bg-gray-500 hover:text-white transition-all duration-300 hover:scale-105"
                onClick={() => handleDeleteRequest(userId)}
              >
                Delete
              </button>
            </div>
          </>
        );
    }
  };
  return (
    <div className="flex flex-row gap-4 justify-center">
      {status === 'friend' && (
        <button className="btn-primary" onClick={() => navigate(`/direct`)}>
          Message
        </button>
      )}
      {checkRelation(status)}
    </div>
  );
};

export const AnalyticsMobile = (props: BioUserProps) => {
  return (
    <div className="flex flex-row justify-between py-4 px-16 border-solid border-t-[1px] border-gray-400 w-full">
      <button className="flex items-center justify-center gap-2">
        <p className="font-semibold">{props.user.number_of_posts}</p>
        <p>Posts</p>
      </button>
      <button className="flex items-center justify-center gap-2">
        <p className="font-semibold">{props.user.number_of_friends}</p>
        <p>Friends</p>
      </button>
    </div>
  );
};

export const AnalyticsWeb = (props: BioUserProps) => {
  return (
    <div className="flex flex-row gap-14 ">
      <button className="flex gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
        <p className="font-semibold">{props.user.number_of_posts}</p>
        <p>Posts</p>
      </button>
      <button className="flex gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
        <p className="font-semibold">{props.user.number_of_friends}</p>
        <p>Friends</p>
      </button>
    </div>
  );
};

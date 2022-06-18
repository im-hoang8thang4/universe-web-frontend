import React, { useRef, useState } from 'react';
import { ListFriends } from './list-friends';
import { ListFriendsRequest } from './list-friends-request';

const FriendRequest = () => {
  const listRequestRef = useRef<HTMLSpanElement>(null);
  const listFriendtRef = useRef<HTMLSpanElement>(null);
  const [listRequest, setListRequest] = useState(true);
  const [listFriends, setListFriends] = useState(false);
  if (listRequestRef.current !== null) {
    if (listRequest) {
      listRequestRef.current.style.backgroundColor = 'rgb(107 114 128 / 1)';
      listRequestRef.current.style.color = 'white';
    } else {
      listRequestRef.current.style.backgroundColor = 'rgb(229 231 235 / 1)';
      listRequestRef.current.style.color = 'black';
    }
  }
  if (listFriendtRef.current !== null) {
    if (listFriends) {
      listFriendtRef.current.style.backgroundColor = 'rgb(107 114 128 / 1)';
      listFriendtRef.current.style.color = 'white';
    } else {
      listFriendtRef.current.style.backgroundColor = 'rgb(229 231 235 / 1)';
      listFriendtRef.current.style.color = 'black';
    }
  }

  return (
    <div className="md:flex md:justify-center md:w-full">
      <div className="flex flex-col pt-3 bg-white min-h-screen rounded-md md:max-w-[614px] w-full">
        <div className="flex gap-9 mb-4 md:gap-10 justify-center">
          <span
            ref={listRequestRef}
            className="bg-gray-500 text-white flex items-start font-bold p-2 rounded-xl text-[17px] md:px-7 px-3 cursor-pointer hover:bg-gray-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            onClick={() => {
              setListRequest(true);
              setListFriends(false);
            }}
          >
            Friend requests
          </span>

          <span
            ref={listFriendtRef}
            className="bg-gray-200 flex items-start font-bold p-2 rounded-xl text-[17px] md:px-7 px-3 cursor-pointer hover:bg-gray-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            onClick={() => {
              setListRequest(false);
              setListFriends(true);
            }}
          >
            My friends
          </span>
        </div>
        {listRequest && <ListFriendsRequest />}
        {listFriends && <ListFriends />}
      </div>
    </div>
  );
};

export default FriendRequest;

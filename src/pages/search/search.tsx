import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostSearch from './post-search';
import UserSearch from './user-search';

const Search = () => {
  const params = useParams<{ searchValue: string }>();
  const listUserRef = useRef<HTMLSpanElement>(null);
  const listPosttRef = useRef<HTMLSpanElement>(null);
  const [listUser, setListUser] = useState(true);
  const [listPost, setLisPost] = useState(false);
  const searchValue = params.searchValue;
  if (listUserRef.current !== null) {
    if (listUser) {
      listUserRef.current.style.backgroundColor = 'rgb(107 114 128 / 1)';
      listUserRef.current.style.color = 'white';
    } else {
      listUserRef.current.style.backgroundColor = 'rgb(229 231 235 / 1)';
      listUserRef.current.style.color = 'black';
    }
  }
  if (listPosttRef.current !== null) {
    if (listPost) {
      listPosttRef.current.style.backgroundColor = 'rgb(107 114 128 / 1)';
      listPosttRef.current.style.color = 'white';
    } else {
      listPosttRef.current.style.backgroundColor = 'rgb(229 231 235 / 1)';
      listPosttRef.current.style.color = 'black';
    }
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col px-1 pt-3 md:pt-2 bg-white h-screen rounded-md md:max-w-[614px] w-full">
        <div className="flex mb-4 gap-5 md:gap-10 justify-center">
          <span
            ref={listUserRef}
            className="bg-gray-500 text-white flex items-start font-bold p-2 rounded-xl text-[17px] px-10 cursor-pointer hover:bg-gray-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            onClick={() => {
              setListUser(true);
              setLisPost(false);
            }}
          >
            Users
          </span>

          <span
            ref={listPosttRef}
            className="bg-gray-200 flex items-start font-bold p-2 rounded-xl text-[17px] px-10 cursor-pointer hover:bg-gray-500 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            onClick={() => {
              setListUser(false);
              setLisPost(true);
            }}
          >
            Posts
          </span>
        </div>
        {listUser && <UserSearch searchValue={searchValue} />}
        {listPost && <PostSearch searchValue={searchValue} />}
      </div>
    </div>
  );
};

export default Search;

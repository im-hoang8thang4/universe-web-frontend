import React from 'react';
import defaultAvatar from '../../assets/img/user.png';
import { MdClose } from 'react-icons/md';
export const Toast = () => {
  return (
    <div className="w-full max-w-xs p-2 text-gray-900 bg-white rounded-lg shadow absolute bottom-4 left-4 z-10 ">
      <div className="flex items-center">
        <div className="relative inline-block shrink-0">
          <img className="w-12 h-12 rounded-full" src={defaultAvatar} alt="" />
          <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
        <div className="ml-3 text-sm font-normal">
          <h4 className="text-sm font-semibold text-gray-900">Hoang Nguyen</h4>
          <div className="text-sm font-normal">commmented on your photo</div>
          <span className="text-xs font-medium text-blue-600">a few seconds ago</span>
        </div>
        <button className="absolute right-1 top-1 p-2 rounded-md hover:bg-gray-200">
          <MdClose />
        </button>
      </div>
    </div>
  );
};

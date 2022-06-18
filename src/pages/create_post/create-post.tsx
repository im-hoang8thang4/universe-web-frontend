import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaUserTag } from 'react-icons/fa';
import { FcAddImage } from 'react-icons/fc';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/img/user.png';
import Spinner from '../../components/spinner/spinner';
import { RootState, STORE } from '../../store/redux';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import { toastNotify } from '../../utils/helpers';
import { IFriend } from '../friend-request/friend.interface';
import { getListFriends } from '../friend-request/list-friends.thunks';
import { Attachment } from '../personal_page/user.interface';
import { uploadFiles, uploadPost } from './createPost.thunks';
const CreatePost = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfor);
  const [files, setFiles] = useState([] as File[]);
  const [openTag, setOpenTag] = useState(false);
  const [pravicy, setPravicy] = useState('public');
  const [content, setContent] = useState('');
  const [tagged, setTagged] = useState([] as string[]);
  const opts = ['public', 'only_me', 'friends'];
  const nagivate = useNavigate();
  const handleFilesUpload = (fls: FileList) => {
    const tempFiles = [] as File[];
    for (let i = 0; i < fls.length; i++) {
      tempFiles.push(fls[i]);
    }
    setFiles(files.concat(tempFiles));
  };
  const deleteFile = (index: number) => {
    setFiles(files.filter((val, i) => i !== index));
  };
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch<typeof STORE.dispatch>();
  const handleUploadFiles = async () => {
    setUploading(true);
    if (files.length > 0) {
      const res = await dispatch(uploadFiles(files)).unwrap();
      if (res.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
        const data = {
          taggedUsers: tagged,
          attachments: res.data.attachments.map((a: Attachment) => a._id),
          content: content,
          privacy: pravicy,
        } as UploadPost;
        handlePost(data);
      } else {
        toastNotify(res);
      }
    } else {
      const data = {
        taggedUsers: tagged,
        attachments: [],
        content: content,
        privacy: pravicy,
      } as UploadPost;
      handlePost(data);
    }
  };
  const handlePost = async (data: UploadPost) => {
    const res = await dispatch(uploadPost(data)).unwrap();
    if (res.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
      setUploading(false);
      nagivate(`/post-detail/${res.data._id}`);
    } else {
      setUploading(false);
      nagivate(`/create-post`);
      toastNotify(res);
    }
  };

  return uploading ? (
    <Spinner />
  ) : (
    <div className="md:flex md:justify-center md:w-full">
      <div className="flex justify-center flex-col bg-white rounded-md md:max-w-[614px] w-full">
        <div className="flex justify-between border-solid border-b-[1px] border-gray-300 p-3 items-center">
          <div className="w-[24px]"></div>
          <div className="text-20 font-semibold">Create new post</div>
          <Link to="/">
            <MdOutlineClose fontSize={24} />
          </Link>
        </div>
        <div className="flex flex-col p-3">
          <div className="flex gap-3 items-center mb-3">
            <div className="flex justify-center items-center w-8 h-8 rounded-full">
              <img
                src={
                  userInfo.avatar
                    ? `${process.env.REACT_APP_API_BASE_URL}attachment/${userInfo.avatar._id}`
                    : defaultAvatar
                }
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base">{`${userInfo.firstName} ${userInfo.lastName}`}</span>
              <select id="pravicy" className="rounded-md w-20 bg-gray-100" onChange={(e) => setPravicy(e.target.value)}>
                {opts.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <textarea
            placeholder={`Hi ${userInfo.lastName}, what are you thinking?`}
            className="w-full h-24"
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="relative">
            <div className="flex gap-3 items-center cursor-pointer" onClick={() => setOpenTag(!openTag)}>
              <FaUserTag fontSize={24} />
              <p className="font-semibold">Tag friends</p>
            </div>
            {openTag && (
              <>
                <div
                  className="flex justify-center items-center"
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                  onClick={() => {
                    setOpenTag(false);
                  }}
                ></div>
                <PopupListFriends state={tagged} setState={setTagged} />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-md items-center">
          {files.length > 0 &&
            files.map((item, index) => {
              return (
                <div key={index} className="relative">
                  {item.type.startsWith('image/') && (
                    <img src={URL.createObjectURL(item)} alt="" className="object-contain rounded-md" />
                  )}
                  {item.type.startsWith('video/') && (
                    <video src={URL.createObjectURL(item)} controls className="object-contain rounded-md" />
                  )}
                  <button
                    type="button"
                    onClick={() => deleteFile(index)}
                    className="absolute font-semibold px-3 py-[8px] bg-gradient-to-r from-purple-600 to-blue-500 rounded-full hover:from-pink-500 hover:to-purple-500 hover:text-white transition-all duration-300 bottom-3 right-3 flex items-center"
                  >
                    <AiOutlineDelete fontSize={20} />
                  </button>
                </div>
              );
            })}
        </div>
        <label className="h-96 border-solid border-y-[1px] border-gray-300 cursor-pointer">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-2xl">
                <FcAddImage />
              </p>
              <p className="text-lg font-semibold">Add your image/video</p>
            </div>
          </div>
          <input
            type="file"
            name="upload-image[]"
            className="w-0 h-0"
            onChange={(e) => {
              e.target.files?.length && handleFilesUpload(e.target.files);
            }}
            multiple
            accept="video/*,image/*"
          />
        </label>
        <div className="flex justify-center items-center font-bold py-7">
          <button className="btn-primary" onClick={handleUploadFiles}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

export const PopupListFriends = (props: PopupListFriendsProps) => {
  const state = props.state;
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userState.gotFriendsList) {
      dispatch(getListFriends());
    }
  }, [dispatch, userState]);
  const handleAdd = (opt: string) => {
    props.setState((prev: string[]) => {
      const isChecked = state.includes(opt);
      if (isChecked) {
        return state.filter((item: string) => item !== opt);
      } else {
        return [...prev, opt];
      }
    });
  };
  return (
    <div className="flex flex-col p-2 px-3 overflow-y-auto absolute bg-white max-h-64 w-64 rounded-md shadow-md z-10 right-[-25px] md:left-0 md:max-h-60 left-0">
      {userState.listFriend.map((friend) => (
        <div
          key={friend._id}
          className="flex gap-1 items-center hover:bg-gray-200 cursor-pointer transition duration-300 hover:scale-105 rounded-md"
        >
          <FriendTag info={friend} />{' '}
          <input
            type="checkbox"
            className="w-9 cursor-pointer"
            onChange={() => handleAdd(friend._id)}
            checked={state.includes(friend._id)}
          />
        </div>
      ))}
    </div>
  );
};
export const FriendTag = (props: { info: IFriend }) => {
  return (
    <div className="flex gap-3 w-full py-2 px-2 items-center">
      <div className="w-9 h-9 rounded-full">
        <img
          src={
            props.info.avatar
              ? `${process.env.REACT_APP_API_BASE_URL}attachment/${props.info.avatar._id}`
              : defaultAvatar
          }
          className="rounded-full w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="font-semibold text-black hover:decoration-solid hover:underline">{`${props.info.firstName} ${props.info.lastName}`}</div>
    </div>
  );
};

export interface PopupListFriendsProps {
  state: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}
export interface UploadPost {
  content: string;
  privacy: string;
  attachments: string[];
  taggedUsers: string[];
}

import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaLock, FaRegComment, FaUsers } from 'react-icons/fa';
import { MdPublic } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import required modules
import { Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import defaultAvatar from '../../assets/img/user.png';
import { deletePostById } from '../../pages/personal_page/post.thunks';
import { Post, SinglePostProps, TaggedUser, UserInfor } from '../../pages/personal_page/user.interface';
import { RootState, STORE } from '../../store/redux';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import { timeSince, toastNotify } from '../../utils/helpers';
import { CommentInput } from '../comment-input/comment-input';
import ListComment from '../comment/list-comment';
import MediaCustom from '../media/media-custom';
import PopupListUser from '../navbar/popup-list-user';
import { deleteReact, postReact } from './react.thunks';
import './slice.css';
import { FacebookShareButton } from 'react-share';

const SinglePost = (props: SinglePostProps) => {
  const user = useSelector((state: RootState) => state.user.userInfor);
  const dispatch = useDispatch<typeof STORE.dispatch>();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [checkPost, setCheckPost] = useState(false);
  const reactUser = {
    avatar: user.avatar,
    firstName: user.firstName,
    lastName: user.lastName,
    _id: user._id,
  } as UserInfor;
  useEffect(() => {
    if (user._id === props.detail.author._id) {
      setCheckPost(true);
    }
  }, [user._id, props.detail.author._id]);
  const nagivate = useNavigate();
  const userId = user._id;
  const [post, setPost] = useState(props.detail as Post);
  const [openListUser, setOpenlistUser] = useState(false);
  const [openReactions, setopenReactions] = useState(false);
  const [like, setLike] = useState(false);
  const d = new Date(props.detail.createdAt);
  const createdAt = timeSince(d);
  const handleDeletePost = async (id: string) => {
    const result = await dispatch(deletePostById(id)).unwrap();
    nagivate('/me');
    toastNotify(result, { successMessage: 'Delete post successfully' });
  };
  const handelPrivacy = (privacy: string) => {
    switch (privacy) {
      case 'public':
        return <MdPublic fontSize={16} className="text-gray-500" />;
      case 'only_me':
        return <FaLock fontSize={16} className="text-gray-500" />;
      case 'friends':
        return <FaUsers fontSize={16} className="text-gray-500" />;
    }
  };
  useEffect(() => {
    if (post.reacted) {
      setLike(true);
    } else if (post.reactions) {
      if (post.reactions.some((react) => react._id === userId)) setLike(true);
    }
  }, [post.reacted, post.reactions, userId]);
  const handlePostReact = async (id: string) => {
    const result = await postReact(id);
    if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
      if (post.reactions) {
        post.reactions.unshift(reactUser);
      }
      if (Object.hasOwn(post, 'reacts')) {
        post.reacts = post.reacts + 1;
      }
      setLike(true);
    }
  };
  const handleDeleteReact = async (id: string) => {
    const result = await deleteReact(id);
    if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
      if (post.reactions) {
        const newReactions = {
          reactions: post.reactions.filter((react) => react._id !== userId) as TaggedUser[],
        };
        setPost({ ...post, ...newReactions });
      }
      if (Object.hasOwn(post, 'reacts')) {
        post.reacts = post.reacts - 1;
      }
      setLike(false);
    }
  };
  return (
    <div className="flex flex-col mt-2 py-4 md:w-[614px] rounded-md bg-white border-solid border-[1px] border-gray-200 md:mt-3">
      {openConfirm && (
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
            setOpenConfirm(false);
          }}
        >
          <div className="absolute flex flex-col bg-white rounded-md shadow-sm px-3">
            <div className="pb-6 pt-3">Are you sure to delete this post?</div>
            <div className="w-full flex justify-center pb-3">
              <div className="flex gap-10">
                <button
                  onClick={() => handleDeletePost(props.detail._id)}
                  className="flex justify-center hover:scale-110 px-4"
                >
                  OK
                </button>
                <button
                  className="text-red-500 flex justify-center hover:scale-110"
                  onClick={() => {
                    setOpenConfirm(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row items-center px-4 pb-3 justify-between">
        <div className="flex justify-start items-center">
          <Link to={`/${post.author._id}`}>
            <div className="flex justify-center items-center w-8 h-8 rounded-full mr-2 cursor-pointer">
              {post.author.avatar ? (
                <MediaCustom attachment={post.author.avatar} css={'w-full h-full rounded-full object-cover'} />
              ) : (
                <img src={defaultAvatar} className="w-full h-full rounded-full object-cover" alt="" />
              )}
            </div>
          </Link>
          <div className="flex flex-col items-start">
            <div className="md:flex md:gap-1">
              <Link to={`/${post.author._id}`}>
                <span className="font-semibold text-sm hover:decoration-solid hover:underline inline-block">{`${post.author.firstName} ${post.author.lastName}`}</span>
              </Link>
              {post.taggedUsers.length === 1 && (
                <div>
                  {' '}
                  is with{' '}
                  <Link to={`/${post.taggedUsers[0]._id}`}>
                    <span className="font-semibold text-sm hover:decoration-solid hover:underline">{`${post.taggedUsers[0].firstName} ${post.taggedUsers[0].lastName}`}</span>
                  </Link>
                </div>
              )}
              {post.taggedUsers.length > 1 && (
                <p className="break-words">
                  {' '}
                  is with{' '}
                  <Link to={`/${post.taggedUsers[0]._id}`}>
                    <span className="font-semibold text-sm hover:decoration-solid hover:underline">{`${post.taggedUsers[0].firstName} ${post.taggedUsers[0].lastName}`}</span>{' '}
                  </Link>
                  and{' '}
                  <button
                    onClick={() => setOpenlistUser(!openListUser)}
                    className="font-semibold text-sm hover:decoration-solid hover:underline cursor-pointer relative"
                  >
                    {' '}
                    {post.taggedUsers.length - 1} other
                    {openListUser && (
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
                            setOpenlistUser(false);
                          }}
                        ></div>
                        <PopupListUser listUser={post.taggedUsers.slice(1, post.taggedUsers.length)} />
                      </>
                    )}
                  </button>
                </p>
              )}
            </div>
            <div className="flex gap-1">
              <span className="text-xs text-gray-500 mr-1">{createdAt}</span>
              {handelPrivacy(post.privacy)}
            </div>
          </div>
        </div>
        {checkPost && (
          <button className="flex justify-center items-center text-gray-600" onClick={() => setOpenConfirm(true)}>
            <RiDeleteBin5Line fontSize={24} />
          </button>
        )}
      </div>
      <div className="flex justify-start items-center px-4 mb-2">
        <p className="font-normal text-sm whitespace-pre-wrap" style={{ wordBreak: 'break-word' }}>
          {post.content}
        </p>
      </div>
      <Swiper pagination={true} navigation={true} modules={[Pagination, Navigation]} className="w-full">
        {post.attachments.map((attachment, index) => (
          <SwiperSlide className="bg-gray-300 flex justify-center items-center w-full" key={index}>
            <MediaCustom attachment={attachment} css={'w-full h-full object-contain'} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex px-4 py-3 justify-between items-center border-solid border-b-[1px] border-gray-400">
        <div className="flex gap-4 items-center">
          {like ? (
            <button onClick={() => handleDeleteReact(props.detail._id)}>
              <AiFillStar
                fontSize={24}
                style={{ cursor: 'pointer' }}
                className="text-yellow-500 duration-500 scale-125 transition-all"
              />
            </button>
          ) : (
            <button onClick={() => handlePostReact(props.detail._id)}>
              <AiOutlineStar
                fontSize={24}
                style={{ cursor: 'pointer' }}
                className="duration-300 transition-all hover:-translate-y-1 hover:scale-105"
              />
            </button>
          )}
          <Link to={`/post-detail/${post._id}`}>
            <FaRegComment fontSize={22} className="transition-all duration-300 hover:-translate-y-1 hover:scale-105" />
          </Link>

          <FacebookShareButton url={`https://vnexpress.net/bao-thai-lan-khen-u22-viet-nam-4604244.html`}>
            <button>Chia sẻ</button>
          </FacebookShareButton>
        </div>
        <div className="flex gap-2 items-center">
          {Object.hasOwn(post, 'reacts') && (
            <div className="text-xs text-gray-500 hover:text-black hover:font-semibold hover:decoration-solid hover:underline cursor-pointer">
              {post.reacts} Stars
            </div>
          )}
          {post.reactions && (
            <button
              onClick={() => {
                setopenReactions(!openReactions);
              }}
              className="text-xs text-gray-500 hover:text-black hover:font-semibold hover:decoration-solid hover:underline relative cursor-pointer"
            >
              {post.reactions && post.reactions.length} Stars,
              {openReactions && post.reactions.length > 0 && (
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
                      setopenReactions(false);
                    }}
                  ></div>
                  <PopupListUser listUser={post.reactions} />
                </>
              )}
            </button>
          )}
          {Object.hasOwn(post, 'totalComments') && (
            <span className="text-xs text-gray-500 hover:text-black hover:font-semibold hover:decoration-solid hover:underline cursor-pointer">
              {post.totalComments} Comments
            </span>
          )}
          {post.comments && !Object.hasOwn(post, 'totalComments') && (
            <span className="text-xs text-gray-500 hover:text-black hover:font-semibold hover:decoration-solid hover:underline cursor-pointer">
              {post.comments.length} Comments
            </span>
          )}
        </div>
      </div>
      <div className="mt-3">
        <ListComment listComment={props.detail.comments} state={post} setState={setPost} />
      </div>
      <div className="w-full mt-2">
        <CommentInput state={post} setState={setPost} />
      </div>
    </div>
  );
};

export default SinglePost;

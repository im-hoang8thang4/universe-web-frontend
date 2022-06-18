import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import ReactTextareaAutosize from 'react-textarea-autosize';
import defaultAvatar from '../../assets/img/user.png';
import { Comment, Post } from '../../pages/personal_page/user.interface';
import { RootState } from '../../store/redux';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import { postComment } from './comment.thunks';
export const CommentInput = (props: CommentInputProps) => {
  const userInfor = useSelector((state: RootState) => state.user.userInfor);
  const [valueComment, setValueComment] = useState('');
  const [commenting, setCommenting] = useState(false);
  const postId = props.state._id;
  const handlePostComment = async (postId: string, content: string) => {
    const result = await postComment(postId, content);
    if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
      const res = result.data as Comment;
      const newComment = {
        _id: res._id,
        author: {
          _id: userInfor._id,
          firstName: userInfor.firstName,
          lastName: userInfor.lastName,
          avatar: userInfor.avatar,
        },
        createdAt: res.createdAt,
        post: res.post,
        content: res.content,
        replies: res.replies,
      } as Comment;
      const comments = props.state.comments;
      comments.push(newComment);
      const commentsState = {
        comments: comments,
      };
      props.setState({ ...props.state, ...commentsState });
      if (Object.hasOwn(props.state, 'totalComments')) {
        const totalCmt = { totalComments: props.state.totalComments + 1 };
        props.setState({ ...props.state, ...totalCmt });
      }
      setValueComment('');
    }
  };
  const handlekeyDown = async (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      setCommenting(true);
      await handlePostComment(postId, valueComment);
      setCommenting(false);
    }
  };
  return (
    <div className="flex w-full items-center gap-2 px-3 mb-2">
      <div className="w-9 h-8 rounded-full">
        <img
          src={
            userInfor.avatar ? `${process.env.REACT_APP_API_BASE_URL}attachment/${userInfor.avatar._id}` : defaultAvatar
          }
          alt="user"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="flex bg-gray-100 w-full items-center rounded-2xl">
        <ReactTextareaAutosize
          disabled={commenting}
          maxRows={5}
          placeholder="Add your comment..."
          className="bg-gray-100 p-2 w-full rounded-2xl outline-none caret-pink-500"
          onKeyDown={(e) => handlekeyDown(e)}
          onChange={(e) => setValueComment(e.target.value)}
          value={valueComment}
        />
        <button className="text-blue-400 font-semibold px-2 cursor-pointer min-w-[60px] flex justify-center">
          {!commenting ? (
            <AiOutlineSend onClick={() => handlePostComment(postId, valueComment)} fontSize={24} />
          ) : (
            <SyncLoader size={8} />
          )}
        </button>
      </div>
    </div>
  );
};

export interface CommentInputProps {
  state: Post;
  setState: React.Dispatch<React.SetStateAction<Post>>;
}

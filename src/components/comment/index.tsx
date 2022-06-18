import { useEffect, useState } from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../assets/img/user.png';
import { Comment, CommentProps } from '../../pages/personal_page/user.interface';
import { RootState } from '../../store/redux';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import { timeSince } from '../../utils/helpers';
import { CommentReplyInput } from '../comment-input/comment-reply-input';
import { deleteComment } from '../comment-input/comment.thunks';
import MediaCustom from '../media/media-custom';
export const CommentDisplay = (props: CommentProps) => {
  const userId = useSelector((state: RootState) => state.user.userInfor._id);
  const [dis, setDis] = useState(false);
  const [reply, setReply] = useState(false);
  const [check, setCheck] = useState(false);
  const [detail, setDetail] = useState(props.detail as Comment);
  const [openConfirm, setOpenConfirm] = useState(false);
  const d = new Date(detail.createdAt);
  const createdAt = timeSince(d);
  useEffect(() => {
    if (userId === detail.author._id) {
      setCheck(true);
    }
  }, [userId, detail.author._id]);
  const handleDeleteComment = async (id: string) => {
    const result = await deleteComment(id);
    if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
      props.setIsDelete(true);
      const newComment = props.state.filter((cmt) => cmt._id !== id);
      props.setState(newComment);
    }
  };
  return (
    <div className="flex px-4 gap-2">
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
            <div className="pb-6 pt-3">Are you sure to delete this comment?</div>
            <div className="w-full flex justify-center pb-3">
              <div className="flex gap-10">
                <button
                  onClick={() => handleDeleteComment(props.detail._id)}
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
      <Link to={`/${detail.author._id}`}>
        <div className="w-8 h-8 rounded-full cursor-pointer">
          {detail.author.avatar ? (
            <MediaCustom attachment={detail.author.avatar} css={'w-full h-full rounded-full object-cover'} />
          ) : (
            <img src={defaultAvatar} className="w-full h-full rounded-full object-cover" alt="" />
          )}
        </div>
      </Link>
      <div
        className="flex flex-col items-start w-full"
        onMouseEnter={() => setDis(true)}
        onMouseLeave={() => setDis(false)}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col px-3 py-1 bg-gray-200 rounded-2xl max-w-[290px] w-auto md:max-w-[520px]">
            <Link to={`/${detail.author._id}`}>
              <span className="font-semibold text-14">{`${detail.author.firstName} ${detail.author.lastName}`}</span>
            </Link>
            <p className="text-14 break-words whitespace-pre-wrap">{detail.content} </p>
          </div>
          {check && dis && (
            <RiDeleteBack2Line
              fontSize={16}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => setOpenConfirm(true)}
            />
          )}
        </div>
        <div className="flex gap-2 px-3">
          <button className="text-13 cursor-pointer font-semibold text-gray-800" onClick={() => setReply(!reply)}>
            Reply
          </button>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-1">{createdAt}</span>
          </div>
        </div>
        {detail.replies && (
          <div className="flex flex-col">
            {detail.replies.map((subComment) => (
              <div key={subComment._id}>
                <SubComment detail={subComment} state={detail} setState={setDetail} />
              </div>
            ))}
          </div>
        )}
        {reply && <CommentReplyInput detail={detail} setDetail={setDetail} />}
      </div>
    </div>
  );
};

export const SubComment = (props: SubCommentProps) => {
  const userId = useSelector((state: RootState) => state.user.userInfor._id);
  const [dis, setDis] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [check, setCheck] = useState(false);
  const d = new Date(props.detail.createdAt);
  const createdAt = timeSince(d);
  const handleDeleteComment = async (id: string) => {
    const result = await deleteComment(id);
    if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
      const newReplies = props.state.replies.filter((cmt) => cmt._id !== id);
      props.setState({ ...props.state, ...{ replies: newReplies } });
    }
  };
  useEffect(() => {
    if (userId === props.detail.author._id) {
      setCheck(true);
    }
  }, [userId, props.detail.author._id]);
  return (
    <div className="flex gap-2 mt-2 ">
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
            <div className="pb-6 pt-3">Are you sure to delete this comment?</div>
            <div className="w-full flex justify-center pb-3">
              <div className="flex gap-10">
                <button
                  onClick={() => handleDeleteComment(props.detail._id)}
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
      <Link to={`/${props.detail.author._id}`}>
        <div className="w-8 h-8 rounded-full cursor-pointer">
          {props.detail.author.avatar ? (
            <MediaCustom attachment={props.detail.author.avatar} css={'w-full h-full rounded-full object-cover'} />
          ) : (
            <img src={defaultAvatar} className="w-full h-full rounded-full object-cover" alt="" />
          )}
        </div>
      </Link>
      <div className="flex flex-col items-start" onMouseEnter={() => setDis(true)} onMouseLeave={() => setDis(false)}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col px-3 py-1 bg-gray-200 rounded-2xl max-w-[300px] w-auto md:max-w-[500px]">
            <Link to={`/${props.detail.author._id}`}>
              <span className="font-semibold text-14">{`${props.detail.author.firstName} ${props.detail.author.lastName}`}</span>
            </Link>
            <p className="text-14 break-words whitespace-pre-wrap">{props.detail.content}</p>
          </div>
          {check && dis && (
            <RiDeleteBack2Line
              fontSize={16}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => setOpenConfirm(true)}
            />
          )}
        </div>

        <div className="flex gap-2 px-3">
          <div className="flex items-center">
            <span className="text-xs text-gray-500">{createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface SubCommentProps {
  detail: Comment;
  state: Comment;
  setState: React.Dispatch<React.SetStateAction<Comment>>;
}

import React, { useEffect, useState } from 'react';
import { CommentDisplay } from '.';
import { ListCommentProps } from '../../pages/personal_page/user.interface';

const ListComment = (props: ListCommentProps) => {
  const [listComment, setListComment] = useState(props.listComment);
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {
    props.setState({ ...props.state, ...{ comments: listComment } });
  }, [listComment]);
  useEffect(() => {
    if (Object.hasOwn(props.state, 'totalComments') && isDelete) {
      const totalCmt = { totalComments: props.state.totalComments - 1 };
      props.setState({ ...props.state, ...totalCmt });
      setIsDelete(false);
    }
  }, [isDelete, props]);

  return (
    <div className="flex flex-col gap-2">
      {listComment.map((comment) => (
        <div key={comment._id}>
          <CommentDisplay detail={comment} setState={setListComment} state={listComment} setIsDelete={setIsDelete} />
        </div>
      ))}
    </div>
  );
};

export default ListComment;

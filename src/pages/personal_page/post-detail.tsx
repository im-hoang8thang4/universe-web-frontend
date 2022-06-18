import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SinglePost from '../../components/single_post/single-post';
import Spinner from '../../components/spinner/spinner';
import { STORE } from '../../store/redux';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import { getPostById } from './post.thunks';
import { Post } from './user.interface';

const PostDetail = () => {
  const params = useParams<{ postId: string }>();
  const [post, setPost] = useState({} as Post);
  const dispatch = useDispatch<typeof STORE.dispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const result = await dispatch(getPostById(params.postId as string)).unwrap();
      if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
        setPost(result.data);
      } else {
        navigate('/not-found', { replace: true });
      }
    })();
  }, [dispatch, navigate, params.postId]);
  return !Object.keys(post).length ? (
    <div className="absolute w-full h-screen">
      <Spinner />
    </div>
  ) : (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 overflow-hidden">
      <div className="md:flex md:w-full md:justify-center">
        <SinglePost detail={post} />
      </div>
    </div>
  );
};

export default PostDetail;

import React, { useEffect, useState } from 'react';
import { TiCameraOutline } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import { STORE } from '../../store/redux';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import PostHoverPersonal from '../personal_page/post-hover-person';
import { Post } from '../personal_page/user.interface';
import { getPostsSelected } from './userSelected.thunks';
const ListPersonalImage = (props: { userId: string }) => {
  const [posts, setPosts] = useState([] as Post[]);
  const [page, setPage] = useState(0);
  const [more, setMore] = useState(true);
  const dispatch = useDispatch<typeof STORE.dispatch>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const querry = {
        page: page,
        userId: props.userId,
      };
      setLoading(true);
      const result = await dispatch(getPostsSelected(querry)).unwrap();
      if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
        if (result.data.length === 0) {
          setMore(false);
        }
        setPosts((prev) => [...prev, ...result.data]);
        setLoading(false);
      }
    })();
  }, [dispatch, props.userId, page]);
  return (
    <div className="flex justify-center bg-gray-50">
      <div className="flex flex-col w-full items-center md:max-w-[975px] pb-5">
        <div className="flex justify-center w-full items-center gap-2 py-4">
          <TiCameraOutline fontSize={24} className="text-gray-700" /> <p className="text-gray-600">Posts</p>
        </div>
        <div className="grid grid-cols-3 md:gap-5 gap-3">
          {posts.map((item, index) => (
            <Link to={`/post-detail/${item._id}`} key={index}>
              <PostHoverPersonal post={item} />
            </Link>
          ))}
        </div>
        {loading && <Spinner />}
        {more && (
          <button
            onClick={() => {
              if (more) {
                setPage(page + 1);
              }
            }}
            className="btn-primary mt-3"
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default ListPersonalImage;

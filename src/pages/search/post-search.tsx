import React, { useEffect, useState } from 'react';
import SinglePost from '../../components/single_post/single-post';
import Spinner from '../../components/spinner/spinner';
import { AXIOS_RESPONSE_TYPE, IAxiosResponse, request } from '../../utils/axios';
import { Post } from '../personal_page/user.interface';

const PostSearch = (props: any) => {
  const [listPost, setListPost] = useState([] as Post[]);
  const searchValue = props.searchValue;
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const result: IAxiosResponse = await request.get(
        `${process.env.REACT_APP_API_BASE_URL}post/search?page=${page}&limit=5&content=${searchValue}`,
      );
      if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
        if (result.data.length === 0) {
          setMore(false);
        }
        setListPost((prev) => [...prev, ...result.data]);
        setLoading(false);
      }
    })();
  }, [searchValue, page]);
  return (
    <div className="flex flex-col pb-3">
      <div className="pt-2">{`Result for "${searchValue}"`}</div>
      {listPost.map((post) => (
        <div className="w-full" key={post._id}>
          <SinglePost detail={post} />
        </div>
      ))}
      {!listPost.length && !loading && (
        <div className="flex justify-center pt-6 text-gray-300">Can't find any post</div>
      )}
      {loading && <Spinner />}
      {more && !loading && (
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
  );
};

export default PostSearch;

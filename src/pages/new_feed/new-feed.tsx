import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import SinglePost from '../../components/single_post/single-post';
import Spinner from '../../components/spinner/spinner';
import { AXIOS_RESPONSE_TYPE, IAxiosResponse, request } from '../../utils/axios';
import { Post } from '../personal_page/user.interface';
const NewFeed = () => {
  const [listPost, setListPost] = useState([] as Post[]);
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    (async () => {
      if (more) {
        setLoading(true);
        const result: IAxiosResponse = await request.get(
          `${process.env.REACT_APP_API_BASE_URL}post/feed?page=${page}&limit=5`,
        );
        if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
          if (result.data.length === 0) {
            setMore(false);
          }
          setListPost((prev) => [...prev, ...result.data]);
          setLoading(false);
        }
      }
    })();
  }, [more, page]);
  return (
    <InfiniteScroll
      dataLength={listPost.length}
      next={() => setPage(page + 1)}
      hasMore={more}
      loader={<Spinner />}
      endMessage={
        <p style={{ textAlign: 'center' }} className="pt-3 pb-1 bg-gray-50">
          <p className="font-semibold">Yay! You have read all the posts</p>
        </p>
      }
    >
      <div className="flex justify-center bg-gray-50">
        <div className="flex flex-col px-1 rounded-md md:max-w-[614px] w-full bg-gray-50">
          <div className="flex flex-col items-center bg-gray-50">
            {listPost.map((post) => (
              <div className="w-full" key={post._id + '0'}>
                <SinglePost detail={post} />
              </div>
            ))}
            {listPost.length === 0 && !loading && (
              <div className="text-gray-400 absolute top-1/2">Oh no!! There are no posts yet...</div>
            )}
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default NewFeed;

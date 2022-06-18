import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../assets/img/user.png';
import Spinner from '../../components/spinner/spinner';
import { AXIOS_RESPONSE_TYPE, IAxiosResponse, request } from '../../utils/axios';
import { BioUserProps, UserInfor } from '../personal_page/user.interface';
const UserSearch = (props: any) => {
  const [listUser, setListUser] = useState([] as UserInfor[]);
  const searchValue = props.searchValue;
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const result: IAxiosResponse = await request.get(
        `${process.env.REACT_APP_API_BASE_URL}user/search?name=${searchValue}&limit=10&page=${page}`,
      );
      if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
        if (result.data.length === 0) {
          setMore(false);
        }
        setListUser((prev) => [...prev, ...result.data]);
        setLoading(false);
      }
    })();
  }, [searchValue, page]);
  return (
    <div className="flex flex-col pb-3">
      <div className="p-2">{`Result for "${searchValue}"`}</div>
      {listUser.map((user) => (
        <div key={user._id}>
          <UserSearchElement user={user} />
        </div>
      ))}
      {!listUser.length && !loading && <div className="flex justify-center pt-6 text-gray-300">Can't find anyone</div>}
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

export default UserSearch;

export const UserSearchElement = (props: BioUserProps) => {
  return (
    <div className="flex justify-between items-center rounded-xl hover:bg-gray-200 hover:scale-105 duration-300 transition-all cursor-pointer pr-9 border-solid border-b-[1px] border-gray-200">
      <Link to={`/${props.user._id}`}>
        <div className="flex items-center w-full gap-2 p-2 md:gap-5">
          <div className="w-14 h-14 md:h-[55px] md:w-[55px]">
            <img
              src={
                props.user.avatar
                  ? `${process.env.REACT_APP_API_BASE_URL}attachment/${props.user.avatar._id}`
                  : defaultAvatar
              }
              alt="user"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap">
            <span className="font-semibold hover:decoration-solid hover:underline">{`${props.user.firstName} ${props.user.lastName}`}</span>
            {props.user.education.length > 0 && (
              <div className="text-gray-400 text-13">
                <span className="font-semibold">Education: </span>
                {props.user.education}
              </div>
            )}
            {props.user.address.length > 0 && (
              <div className="text-gray-400 text-13">
                <span className="font-semibold">Address: </span>
                {props.user.address}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

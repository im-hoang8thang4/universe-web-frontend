import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import { RootState, STORE } from '../../store/redux';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import { UserInfor } from '../personal_page/user.interface';
import ListPersonalImage from './list-person-image';
import UserInformation from './user-information-selected';
import { getUserSelected } from './userSelected.thunks';

export const PersonSelectedPage = () => {
  const params: any = useParams<{ userId: string }>();
  const myInfo = useSelector((state: RootState) => state.user.userInfor);
  const [userInfo, setUserInfo] = useState({} as UserInfor);
  const dispatch = useDispatch<typeof STORE.dispatch>();
  const navigate = useNavigate();
  // if id is viewer id then redirect to my profile
  if (params.userId === myInfo._id) navigate('/me', { replace: true });

  useEffect(() => {
    (async () => {
      const result = await dispatch(getUserSelected(params.userId)).unwrap();
      if (result.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
        setUserInfo(result.data);
      } else {
        // invalid user id
        navigate('/not-found', { replace: true });
      }
    })();
  }, [dispatch, params.userId, navigate]);
  return !Object.keys(userInfo).length ? (
    <div className="absolute w-full h-screen">
      <Spinner />
    </div>
  ) : (
    <div className="flex flex-col bg-gray-50 min-h-screen overflow-x-hidden overflow-y-auto">
      <UserInformation user={userInfo} />
      <ListPersonalImage userId={params.userId} />
    </div>
  );
};

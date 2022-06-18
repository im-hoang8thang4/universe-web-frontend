import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner';
import { RootState } from '../../store/redux';
import ListPersonalImage from './list-person-image';
import UserInformation from './user-information';
import { getUserInfor } from './user.slice';

const PersonalPage = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfor);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.keys(userInfo).length) {
      dispatch(getUserInfor());
    }
  }, [dispatch, userInfo]);

  return !Object.keys(userInfo).length ? (
    <Spinner />
  ) : (
    <div className="flex flex-col bg-gray-50 overflow-x-hidden overflow-y-auto">
      <UserInformation user={userInfo} />
      <ListPersonalImage />
    </div>
  );
};

export default PersonalPage;

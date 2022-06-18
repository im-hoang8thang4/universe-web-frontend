import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { ITokens } from '../../interfaces';
import { setTokens } from '../../pages/login/login.slice';
import { getUserInfor } from '../../pages/personal_page/user.slice';
import { RootState } from '../../store/redux';
import Spinner from '../spinner/spinner';

export const AuthGuard = () => {
  const loginState = useSelector((state: RootState) => state.login.tokens);
  const userState = useSelector((state: RootState) => state.user.userInfor);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Object.keys(loginState).length) {
      const localTokens: ITokens = JSON.parse(localStorage.getItem('tokens') || '{}');
      if (!Object.keys(localTokens).length) {
        return navigate('/login', { replace: true });
      }
      dispatch(setTokens(localTokens));
    }
    if (loginState.access_token && !Object.keys(userState).length) {
      dispatch(getUserInfor());
    }
  }, [dispatch, navigate, loginState, userState]);

  return loginState.access_token ? <Outlet /> : <Spinner />;
};

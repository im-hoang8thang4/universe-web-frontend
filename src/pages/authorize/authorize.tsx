import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ITokens } from '../../interfaces';
import { AXIOS_RESPONSE_TYPE } from '../../utils/axios';
import { setTokens } from '../login/login.slice';
import { getTokens } from './authorize.thunks';

export const Authorize = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  useEffect(() => {
    if (code) {
      getTokens(code).then((res) => {
        if (res.type === AXIOS_RESPONSE_TYPE.SUCCESS) {
          const tokens: ITokens = res.data;
          tokens.expires_in = Date.now() + (tokens.expires_in as number) * 1000;
          tokens.refresh_expires_in = Date.now() + (tokens.refresh_expires_in as number) * 1000;
          localStorage.setItem('tokens', JSON.stringify(tokens));
          dispatch(setTokens(tokens)); // store in redux
          navigate('/', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      });
    }
  }, [code, dispatch, navigate]);
  return <></>;
};

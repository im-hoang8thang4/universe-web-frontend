import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/redux';
import { getLoginLink } from './login.thunk';
import test from '../../assets/share.mp4';
import logo from '../../assets/logo.png';
import content from '../../assets/lg.png';
import Typewriter from 'typewriter-effect';

const redirectToKeyCloak = (url: string) => {
  window.location.replace(url);
};

export const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const { data } = state.login;
  useEffect(() => {
    // Run once time on component mount
    dispatch(getLoginLink());
  }, [dispatch]);

  return (
    <div className="flex h-screen w-full justify-center items-center relative">
      <div className="w-full h-full">
        <video src={test} loop controls={false} muted autoPlay className="w-full h-full object-cover" />
      </div>
      <div className="absolute flex flex-col gap-2 items-center top-0 bottom-0 right-0 left-0 justify-center bg-[#0007]">
        <div className="flex gap-3 items-center justify-center">
          <div className="h-12 w-12 md:h-20 md:w-20 flex justify-center items-center">
            <img src={logo} alt="w-full h-full" />
          </div>
          <div className="h-8 w-2/3 md:h-14">
            <img src={content} alt="" className="w-full h-full" />
          </div>
        </div>
        <button
          onClick={() => redirectToKeyCloak(data.url)}
          className="mb-10 px-8 py-2 md:px-12 md:py-3 md:text-20 font-bold bg-gradient-to-r from-purple-600 to-blue-500 mt-[27px] rounded-2xl hover:from-pink-500 hover:to-purple-500 hover:text-white transition-all duration-300"
        >
          Start
        </button>
      </div>
      <div className=" bottom-6 absolute text-gray-200 font-semibold md:text-16">
        <Typewriter
          options={{
            strings: ['Universe - The best social media in the world!', 'Click the start button to experience me!'],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </div>
  );
};

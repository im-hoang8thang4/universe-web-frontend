import React, { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { BsBell, BsBellFill, BsHouse, BsHouseFill } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { HiOutlineUsers, HiUsers } from 'react-icons/hi';
import { MdAddBox, MdLogout, MdOutlineAddBox, MdOutlinePersonPin } from 'react-icons/md';
import { RiMessengerFill, RiMessengerLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/img/user.png';
import logo from '../../assets/universe.png';
import { removeTokens } from '../../pages/login/login.slice';
import { RootState } from '../../store/redux';
import { request } from '../../utils/axios';
import { NavLinkCustom } from '../navlink';
import NoticeBoard from '../notice-board/notice-board';
import { getNotifications } from '../notice-board/notice.thunk';

export const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const userInfo = useSelector((state: RootState) => state.user.userInfor);
  const noticeState = useSelector((state: RootState) => state.notice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!noticeState.gotNotifications) dispatch(getNotifications());
  });

  function handleOpen() {
    setOpenMenu(!openMenu);
  }
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  const handlekeyDown = (key: string) => {
    if (key === 'Enter') {
      navigate(`/search/${searchValue}`);
      setSearchValue('');
    }
  };
  const handleSearchMobile = () => {
    setOpenSearch(false);
    navigate(`/search/${searchValue}`);
    setSearchValue('');
  };
  return (
    <div className="sticky w-full z-20 top-0 ">
      <div className="flex justify-center bg-white border-solid border-b-[1px] border-gray-400 ">
        <div className="w-full flex justify-between items-center px-4 py-4 md:p-6 md:max-w-[975px]">
          <div className="w-32 flex items-center">
            <div
              className="hover:scale-110 transition-all duration-300 delay-75 cursor-pointer"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              <img src={logo} alt="logo" className="w-full" />
            </div>
          </div>
          <div className="hidden md:flex justify-start items-center px-2 rounded-xl bg-gray-200">
            <AiOutlineSearch fontSize={24} className="ml-2" />
            <input
              type="text"
              placeholder="Search"
              className="py-2 px-5 w-full bg-gray-200 outline-none rounded-xl"
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => handlekeyDown(e.key)}
              value={searchValue}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-5 md:gap-6 items-center">
              <NavLinkCustom
                to="/"
                notActiveIcon={<BsHouse fontSize={24} className="hidden md:flex" />}
                activeIcon={<BsHouseFill fontSize={24} className="hidden md:flex" />}
                children={undefined}
              />
              <div onClick={() => setOpenSearch(true)} className="md:hidden">
                <AiOutlineSearch fontSize={24} />
              </div>
              <NavLinkCustom
                to="/direct"
                activeIcon={<RiMessengerFill fontSize={24} />}
                notActiveIcon={<RiMessengerLine fontSize={24} />}
                children={undefined}
              />
              <NavLinkCustom
                to="/create-post"
                activeIcon={<MdAddBox fontSize={24} />}
                notActiveIcon={<MdOutlineAddBox fontSize={24} />}
                children={undefined}
              />
              <NavLinkCustom
                to="/friends"
                activeIcon={<HiUsers fontSize={24} />}
                notActiveIcon={
                  <div className="relative">
                    <HiOutlineUsers fontSize={24} />
                    {userInfo.incomingFriendRequests?.length > 0 && (
                      <GoPrimitiveDot
                        size={20}
                        color={'red'}
                        style={{
                          position: 'absolute',
                          top: '-7px',
                          right: '-5px',
                        }}
                      />
                    )}
                  </div>
                }
                children={undefined}
              />
              {openNotification ? (
                <BsBellFill
                  fontSize={24}
                  onClick={() => setOpenNotification(!openNotification)}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <div className="relative">
                  <BsBell
                    fontSize={24}
                    onClick={() => setOpenNotification(!openNotification)}
                    style={{ cursor: 'pointer' }}
                  />
                  {noticeState.hasNewNoti && (
                    <GoPrimitiveDot
                      size={20}
                      color={'red'}
                      style={{
                        position: 'absolute',
                        top: '-7px',
                        right: '-5px',
                      }}
                    />
                  )}
                </div>
              )}
              {openNotification && (
                <>
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      backgroundColor: '#0003',
                    }}
                    onClick={() => {
                      setOpenNotification(false);
                    }}
                  ></div>
                  <NoticeBoard />
                </>
              )}

              <div className="h-9 w-9 flex items-center">
                <img
                  src={
                    userInfo.avatar
                      ? `${process.env.REACT_APP_API_BASE_URL}attachment/${userInfo.avatar._id}`
                      : defaultAvatar
                  }
                  className="rounded-full w-full h-full object-cover"
                  onClick={handleOpen}
                  style={{ cursor: 'pointer' }}
                  alt="hihi"
                />
                {openMenu && (
                  <>
                    <div
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#0003',
                      }}
                      className="menu-overlay"
                      onClick={() => {
                        setOpenMenu(false);
                      }}
                    ></div>
                    <DropMenu onClick={handleOpen} />
                  </>
                )}
              </div>
              {openSearch && (
                <div className="md:hidden flex justify-start items-center rounded-md bg-gray-200 absolute ml-1">
                  <div onClick={() => setOpenSearch(false)} className="p-1 pl-2">
                    <AiOutlineSearch fontSize={20} />
                  </div>
                  <input
                    size={16}
                    type="text"
                    placeholder="Search"
                    className="py-2 w-full bg-gray-200 outline-none rounded-md"
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchValue}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchMobile();
                      }
                    }}
                  />
                  <div onClick={handleSearchMobile} className="p-1 pr-2 pl-1">
                    <BiSend fontSize={20} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;

export interface IDropMenuProps {
  onClick: () => void;
}

export const DropMenu = (props: IDropMenuProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => state.login);

  const handleLogout = () => {
    request.post(process.env.REACT_APP_API_BASE_URL + 'auth/logout', {
      refreshToken: loginState.tokens.refresh_token,
    });
    localStorage.removeItem('tokens');
    dispatch(removeTokens());
    navigate('/', { replace: true });
  };

  return (
    <div
      onClick={props.onClick}
      className="absolute right-3 top-14 bg-white p-3 flex-col align-center text-center rounded-md shadow-md md:right-9 md:top-20 xl:right-[15%] xl:top-20"
    >
      <Link to="/me">
        <div
          className="flex flex-row gap-2 px-2 pr-4 justify-start items-center py-3 hover:bg-gray-200 rounded-md hover:scale-110 transition-all duration-300"
          style={{ cursor: 'pointer' }}
        >
          <MdOutlinePersonPin fontSize={22} />
          <p>Profile</p>
        </div>
      </Link>
      <Link to="/edit-profile">
        <div
          className="flex flex-row gap-2 px-2 pr-4 justify-start items-center py-3 hover:bg-gray-200 rounded-md hover:scale-110 transition-all duration-300"
          style={{ cursor: 'pointer' }}
        >
          <AiOutlineSetting fontSize={22} />
          <p>Edit my profile</p>
        </div>
      </Link>
      <div
        className="flex flex-row gap-2 px-2 pr-4 justify-start items-center py-3 hover:bg-gray-200 rounded-md hover:scale-110 transition-all duration-300"
        style={{ cursor: 'pointer' }}
        onClick={handleLogout}
      >
        <MdLogout fontSize={22} />
        <p>Logout</p>
      </div>
    </div>
  );
};

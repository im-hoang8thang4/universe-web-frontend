import { BsGenderAmbiguous, BsPhoneVibrate } from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';
import { FaHeartbeat } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { ImSmile } from 'react-icons/im';
import { IoIosCalendar } from 'react-icons/io';
import { MdOutlineSchool, MdOutlineWorkOutline } from 'react-icons/md';
import defaultAvatar from '../../assets/img/user.png';
import { BioUserProps } from './user.interface';

const UserInformation = (props: BioUserProps) => {
  const userInfor = props.user;
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col items-start px-5 bg-gray-50 w-full border-solid border-b-[1px] border-gray-400 md:p-6 md:max-w-[975px]">
        <div className="w-full flex justify-start py-4 gap-7 items-center">
          <div className="w-20 h-20 md:w-36 md:h-36">
            <img
              src={
                userInfor.avatar
                  ? `${process.env.REACT_APP_API_BASE_URL}attachment/${userInfor.avatar._id}`
                  : defaultAvatar
              }
              className="rounded-full w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-5 ml-4 md:ml-12 w-3/5">
            <div className="flex flex-col gap-5 md:gap-10 md:flex md:flex-row">
              <div className="flex items-center flex-col md:flex-row md:gap-2">
                <p className="text-xl font-semibold text-gray-800">{`${userInfor.firstName} ${userInfor.lastName}`}</p>
                <p className="font-semibold text-gray-800">{userInfor.nickname && `(${userInfor.nickname})`}</p>
              </div>
            </div>

            <div className="hidden md:flex">
              <AnalyticsWeb user={userInfor} />
            </div>
            <div className="md:flex  hidden">
              <BioUser user={userInfor} />
            </div>
          </div>
        </div>

        <div className="md:hidden mb-10">
          <BioUser user={userInfor} />
        </div>

        <div className="md:hidden w-full">
          <AnalyticsMobile user={userInfor} />
        </div>
      </div>
    </div>
  );
};

export default UserInformation;

export const AnalyticsMobile = (props: BioUserProps) => {
  const quantityPosts = props.user.number_of_posts;
  const numberFriend = props.user.friends.length;
  return (
    <div className="flex flex-row justify-between py-4 px-16 border-solid border-t-[1px] border-gray-400 w-full">
      <button className="flex items-center cursor-pointer  justify-center gap-2">
        <p className="font-semibold">{quantityPosts}</p>
        <p>Posts</p>
      </button>
      <button className="flex items-center justify-center gap-2">
        <p className="font-semibold">{numberFriend}</p>
        <p>Friends</p>
      </button>
    </div>
  );
};

export const AnalyticsWeb = (props: BioUserProps) => {
  const quantityPosts = props.user.number_of_posts;
  const numberFriend = props.user.friends.length;
  return (
    <div className="flex flex-row gap-14 ">
      <button className="flex gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
        <p className="font-semibold">{quantityPosts}</p>
        <p>Posts</p>
      </button>
      <button className="flex gap-2 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
        <p className="font-semibold">{numberFriend}</p>
        <p>Friends</p>
      </button>
    </div>
  );
};

export const BioUser = (props: BioUserProps) => {
  const userInfor = props.user;
  const birth = userInfor.birthday?.slice(0, 10);
  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-gray-800">Information</h3>
      {userInfor.address?.length > 0 && (
        <div className="flex gap-x-2 items-center pt-3">
          <HiOutlineLocationMarker fontSize={16} />
          <p>
            <span className="font-semibold">Address:</span> {userInfor.address}
          </p>
        </div>
      )}

      {userInfor.birthday && (
        <div className="flex gap-x-2 items-center">
          <IoIosCalendar fontSize={16} />
          <p>
            <span className="font-semibold">Birthday:</span> {birth}
          </p>
        </div>
      )}
      {userInfor.gender && (
        <div className="flex gap-x-2 items-center">
          <BsGenderAmbiguous fontSize={16} />
          <p className="capitalize">
            <span className="font-semibold">Gender:</span> {userInfor.gender}
          </p>
        </div>
      )}
      {userInfor.relationship?.length > 0 && (
        <div className="flex gap-x-2 items-center">
          <FaHeartbeat fontSize={16} />
          <p>
            <span className="font-semibold">Relationship:</span> {userInfor.relationship}
          </p>
        </div>
      )}
      {userInfor.education?.length > 0 && (
        <div className="flex gap-x-2 items-center">
          <MdOutlineSchool fontSize={16} />
          <p>
            <span className="font-semibold">Education:</span> {userInfor.education}
          </p>
        </div>
      )}
      {userInfor.works?.length > 0 && (
        <div className="flex gap-x-2 items-center">
          <MdOutlineWorkOutline fontSize={16} />
          <p>
            <span className="font-semibold">Works:</span> {userInfor.works}
          </p>
        </div>
      )}
      {userInfor.hobbies?.length > 0 && (
        <div className="flex gap-x-2 items-center">
          <ImSmile fontSize={16} />
          <div className="flex gap-2 items-center">
            <span className="font-semibold">Hobbies:</span>
            <div className="flex gap-2 flex-wrap">
              {userInfor.hobbies.map((hobbie: string, i: number) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-md px-2 flex justify-center items-center text-center text-14 md:text-16 capitalize "
                >
                  {hobbie}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {userInfor.phone?.length > 0 && (
        <div className="flex gap-x-2 items-center">
          <BsPhoneVibrate fontSize={16} />
          <p>
            <span className="font-semibold">Phone number:</span> {userInfor.phone}
          </p>
        </div>
      )}

      {userInfor.bio?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <div className="flex gap-2 items-center">
            <CgNotes fontSize={16} />
            <span className="font-semibold">Bio:</span>
          </div>
          {userInfor.bio}
        </div>
      )}
    </div>
  );
};

import { TaggedUser } from '../../pages/personal_page/user.interface';
import defaultAvatar from '../../assets/img/user.png';
import { Link } from 'react-router-dom';
export interface PopupListUserProps {
  listUser: TaggedUser[];
}

export interface UserElementProps {
  user: TaggedUser;
}
const PopupListUser = (props: PopupListUserProps) => {
  const listUser = props.listUser;
  return (
    <div className="flex flex-col p-2 px-3 overflow-y-auto absolute bg-white max-h-44 w-56 rounded-md shadow-md z-10 right-[-25px] md:left-0 md:max-h-60">
      {listUser.map((user) => (
        <div key={user._id}>
          <UserElement user={user} />
        </div>
      ))}
    </div>
  );
};

export default PopupListUser;

export const UserElement = (props: UserElementProps) => {
  return (
    <Link to={`/${props.user._id}`}>
      <div className="flex gap-3 w-full py-2 px-2 items-center rounded-md hover:bg-gray-200 cursor-pointer transition duration-300 hover:scale-105">
        <div className="w-9 h-9 rounded-full">
          <img
            src={
              props.user.avatar
                ? `${process.env.REACT_APP_API_BASE_URL}attachment/${props.user.avatar._id}`
                : defaultAvatar
            }
            className="rounded-full w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="font-semibold text-black hover:decoration-solid hover:underline">{`${props.user.firstName} ${props.user.lastName}`}</div>
      </div>
    </Link>
  );
};

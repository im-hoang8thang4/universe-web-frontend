import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner';
import { RootState } from '../../store/redux';
import EditInformation from './edit-information';

const EditInformationPage = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfor);

  if (!Object.entries(userInfo).length) return <Spinner />;

  return (
    <div className="flex flex-col bg-gray-50 overflow-x-hidden overflow-y-auto w-screen">
      <EditInformation user={userInfo} />
    </div>
  );
};

export default EditInformationPage;

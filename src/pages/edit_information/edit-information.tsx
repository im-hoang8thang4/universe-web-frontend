import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import defaultAvatar from '../../assets/img/user.png';
import Spinner from '../../components/spinner/spinner';
import { STORE } from '../../store/redux';
import { toastNotify } from '../../utils/helpers';
import { BioUserProps, UserInfor } from '../personal_page/user.interface';
import {
  GenderOption,
  HobbiesOption,
  InputDateElement,
  InputNumberElement,
  InputTextArrayElement,
  InputTextElement,
  RelationshipOption,
  TextareaElement,
} from './input-custom';
import { updateUserInfor } from './userUpdate.thunk';
import { updateAvatar } from './userUpdateAvatar.thunks';

const EditInformation = (props: BioUserProps) => {
  const dispatch = useDispatch<typeof STORE.dispatch>();

  const userInfor = props.user;
  const birth = userInfor.birthday?.slice(0, 10);
  const [nickname, setNickname] = useState(userInfor.nickname);
  const [firstName, setFirstName] = useState(userInfor.firstName);
  const [lastName, setLastName] = useState(userInfor.lastName);
  const [bio, setBio] = useState(userInfor.bio);
  const [address, setAddress] = useState(userInfor.address);
  const [hobbies, setHobies] = useState(userInfor.hobbies);
  const [works, setWorks] = useState(userInfor.works);
  const [relationship, setRelationship] = useState(userInfor.relationship);
  const [education, setEducation] = useState(userInfor.education);
  const [birthday, setBirthday] = useState(birth);
  const [phone, setPhone] = useState(userInfor.phone);
  const [gender, setGender] = useState(userInfor.gender);
  const [check, setCheck] = useState(false);

  const [updatingProfile, setUpdatingProfile] = useState(false);
  const handleUpdate = async () => {
    if (firstName.length === 0 || lastName.length === 0) {
      setCheck(true);
    } else {
      const infoUpdate = {
        nickname,
        firstName,
        lastName,
        bio,
        address,
        hobbies,
        works,
        relationship,
        education,
        birthday,
        phone,
        gender,
      } as UserInfor;
      setUpdatingProfile(true);
      const result = await dispatch(updateUserInfor(infoUpdate)).unwrap();
      toastNotify(result, { successMessage: 'Updated profile successfully' });
      setTimeout(() => setUpdatingProfile(false), 1000);
    }
  };

  const [updatingAvatar, setUpdatingAvatar] = useState(false);
  const handleUpdateAvatar = async (e: any) => {
    if (e.target.files.length) {
      setUpdatingAvatar(true);
      const result = await dispatch(updateAvatar(e.target.files[0])).unwrap();
      toastNotify(result, { successMessage: 'Updated avatar successfully' });
      setUpdatingAvatar(false);
    }
  };

  return (
    <div className="md:flex md:justify-center md:w-full">
      {check && (
        <div
          className="flex justify-center items-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: '#0003',
          }}
          onClick={() => {
            setCheck(false);
          }}
        >
          <div className="absolute flex flex-col bg-white rounded-md shadow-sm px-3">
            <div className="pb-6 pt-3">First Name or Last Name can not be empty!</div>
            <div className="w-full flex justify-center pb-3">
              <button
                className="text-red-500 flex justify-center hover:scale-110"
                onClick={() => {
                  setCheck(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-start p-4 gap-5 bg-white md:p-6 md:max-w-[614px] w-full">
        <div className="flex gap-3 items-center md:gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center">
            <img
              src={
                userInfor.avatar
                  ? `${process.env.REACT_APP_API_BASE_URL}attachment/${userInfor.avatar._id}`
                  : defaultAvatar
              }
              alt="avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="font-semibold">{`${userInfor.firstName} ${userInfor.lastName}`}</span>
            <label>
              {updatingAvatar ? (
                <Spinner />
              ) : (
                <span className="cursor-pointer text-blue-600 font-semibold text-14">Change my avatar</span>
              )}
              <input
                type="file"
                name="upload-image"
                className="w-0 h-0"
                accept="image/*"
                onChange={handleUpdateAvatar}
              />
            </label>
          </div>
        </div>
        <div className="w-full">
          <InputTextElement
            title={'Nickname'}
            placeholder={'Enter your Nickname...'}
            setState={setNickname}
            state={nickname}
          />
        </div>
        <div className="w-full flex gap-7">
          <InputTextElement
            title={'First Name'}
            placeholder={'Enter your First Name...'}
            setState={setFirstName}
            state={firstName}
            check={true}
          />
          <InputTextElement
            title={'Last Name'}
            placeholder={'Enter your Last Name...'}
            setState={setLastName}
            state={lastName}
            check={true}
          />
        </div>
        <div>
          <GenderOption setState={setGender} state={gender} />
        </div>

        <div className="w-full">
          <InputDateElement title={'Birthday'} setState={setBirthday} state={birthday} />
        </div>
        <div className="w-full">
          <InputNumberElement title={'Phone Number'} placeholder={'Eg: 0123456789'} setState={setPhone} phone={phone} />
        </div>
        <div className="w-full">
          <InputTextElement
            title={'Address'}
            placeholder={'Enter your address...'}
            setState={setAddress}
            state={address}
          />
        </div>
        <div className="w-full">
          <RelationshipOption setState={setRelationship} state={relationship} />
        </div>
        <div className="w-full">
          <InputTextArrayElement
            title={'Education'}
            placeholder={'Where are you currently or have you studied...'}
            setState={setEducation}
            state={education}
          />
        </div>
        <div className="w-full">
          <InputTextArrayElement title={'Work'} placeholder={'Enter your work...'} setState={setWorks} state={works} />
        </div>
        <div className="w-full">
          <HobbiesOption setState={setHobies} state={hobbies} />
        </div>
        <div className="w-full">
          <TextareaElement title={'Bio'} placeholder={'Enter your bio...'} setState={setBio} state={bio} />
        </div>
        <div className="w-full flex justify-center">
          {updatingProfile ? (
            <div className="py-[15px]">
              <Spinner />
            </div>
          ) : (
            <button onClick={handleUpdate} className="btn-primary">
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditInformation;

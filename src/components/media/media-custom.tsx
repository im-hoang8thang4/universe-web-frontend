import { MediaProps } from '../../pages/personal_page/user.interface';

const MediaCustom = (props: MediaProps) => {
  const attachment = props.attachment;
  if (attachment.mimetype?.includes('video')) {
    return (
      <video
        src={`${process.env.REACT_APP_API_BASE_URL}attachment/${attachment._id}`}
        className={props.css}
        controls
        autoPlay
        muted
        controlsList="nodownload"
        loop
      ></video>
    );
  } else if (attachment.mimetype?.includes('image')) {
    return (
      <img
        src={`${process.env.REACT_APP_API_BASE_URL}attachment/${attachment._id}`}
        className={props.css}
        alt="attachment"
      />
    );
  } else {
    return <></>;
  }
};
export default MediaCustom;

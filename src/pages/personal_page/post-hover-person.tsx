import React, { useState } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import MediaCustom from '../../components/media/media-custom';

import { PostHoverPersonalProps } from './user.interface';
const PostHoverPersonal = (props: PostHoverPersonalProps) => {
  const [postHovered, setPostHovered] = useState(false);
  const attachment = props.post.attachments[0];
  return (
    <div
      className="md:h-[293px] md:w-[293px] h-[128px] w-[128px] rounded-md relative z-1"
      onMouseEnter={() => setPostHovered(true)}
      onMouseLeave={() => setPostHovered(false)}
    >
      <div className="absolute inset-0 transform hover:scale-105 transition duration-300">
        {(attachment && (
          <MediaCustom attachment={attachment} css={'object-cover w-full h-full rounded-md cursor-pointer'} />
        )) || (
          <div className="bg-gradient-to-r from-rose-100 to-teal-100 font-semibold text-stone-700 rounded-md w-full h-full flex text-center justify-center items-center text-13">
            {props.post.content.slice(0, 50)}
            {props.post.content.length > 50 && <>.....</>}
          </div>
        )}

        {postHovered && (
          <div className="rounded-md absolute w-full h-full top-0 bottom-0 right-0 left-0 cursor-pointer flex justify-center items-center gap-1 md:gap-5 bg-[#0002]">
            <div className="flex gap-1 md:gap-2 items-center">
              <AiOutlineStar fontSize={24} className="text-white" />{' '}
              <span className="text-white font-semibold text-xs md:text-base">{props.post.reacts}</span>
            </div>
            <div className="flex gap-1 md:gap-2 items-center">
              <FaRegComment fontSize={24} className="text-white" />{' '}
              <span className="text-white font-semibold text-xs md:text-base">{props.post.totalComments}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHoverPersonal;

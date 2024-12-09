import { CloseCircleOutline, CloseCircle } from 'react-ionicons';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

const Tag = ({ text, styles }: { text: string; styles?: string }) => {
  const [isHoaver, setIsHoaver] = useState(false);

  return (
    <div>
      <span
        className={twMerge(
          `bg-green-500 text-white flex gap-1 items-center px-2 rounded-sm cursor-pointer fill-white text-sm font-semibold ${
            styles ?? ''
          }`,
        )}
        onMouseEnter={() => setIsHoaver(true)}
        onMouseLeave={() => setIsHoaver(false)}
      >
        {text}
        {isHoaver ? (
          <CloseCircle color={``} height="10px" width="10px" />
        ) : (
          <CloseCircleOutline color={``} height="16px" width="16px" />
        )}
      </span>
    </div>
  );
};

export default Tag;

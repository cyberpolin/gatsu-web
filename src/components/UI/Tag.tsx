import { CloseCircleOutline, CloseCircle } from 'react-ionicons';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
const Tag = ({ text, styles }: { text: string; styles?: string }) => {
  const [isHoaver, setIsHoaver] = useState(false);

  return (
    <span
      className={twMerge(
        `bg-green-500 text-white flex justify-between items-center px-2 w-20 rounded-sm cursor-pointer fill-white ${
          styles ?? ''
        }`,
      )}
      onMouseEnter={() => setIsHoaver(true)}
      onMouseLeave={() => setIsHoaver(false)}
    >
      {text}
      {isHoaver ? (
        <CloseCircle color={``} />
      ) : (
        <CloseCircleOutline color={``} />
      )}
    </span>
  );
};

export default Tag;

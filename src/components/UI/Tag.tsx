import { CloseCircleOutline, CloseCircle } from 'react-ionicons';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

const Tag = ({ label, styles = '' }: { label: string; styles?: string }) => {
  const [isHoaver, setIsHover] = useState(false);

  return (
    <div>
      <span
        className={twMerge(
          `bg-green-500 text-white flex gap-2 items-center px-2 py-1 rounded-md cursor-pointer fill-white text-md font-sm w-fit ${styles}`,
        )}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {label}
        {isHoaver ? (
          <CloseCircle color={``} height="18px" width="18px" />
        ) : (
          <CloseCircleOutline color={``} height="20px" width="20px" />
        )}
      </span>
    </div>
  );
};

export default Tag;

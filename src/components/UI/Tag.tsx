import { CloseCircleOutline, CloseCircle } from 'react-ionicons';
import { twMerge } from 'tailwind-merge';

interface TagProps {
  label: string;
  styles?: string;
  handleClose: () => void;
}

const Tag: React.FC<TagProps> = ({ label, styles = '', handleClose }) => {
  return (
    <span
      className={twMerge(
        `bg-green-500 text-white flex gap-1 items-center px-2 py-1 rounded-md cursor-pointer text-md font-sm w-fit ${styles}`,
      )}
    >
      {label}
      <div className="relative group" onClick={() => handleClose()}>
        <CloseCircle
          cssClasses="absolute group-hover:opacity-100 opacity-0 !fill-white transition-opacity"
          height="19px"
          width="19px"
        />
        <CloseCircleOutline
          cssClasses="group-hover:opacity-0 !text-white transition-opacity"
          height="19px"
          width="19px"
        />
      </div>
    </span>
  );
};

export default Tag;

import { twMerge } from 'tailwind-merge';
import Spinner from './Spinner';

interface submitBTN {
  text: string;
  styles?: string;
  handlesubmit: () => void;
}

const SubmitBTN: React.FC<submitBTN> = ({ text, handlesubmit, styles }) => {
  return (
    <button
      className={twMerge(
        `bg-green-500 rounded-sm py-2 px-8 flex  first:ml-3 ${styles} ?? ''`,
      )}
      onClick={handlesubmit}
    >
      <Spinner white loading />
      {text}
    </button>
  );
};

export default SubmitBTN;

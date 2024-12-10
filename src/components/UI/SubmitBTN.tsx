import { twMerge } from 'tailwind-merge';
import Spinner from './Spinner';

interface submitBTN {
  label: string;
  styles?: string;
  isLoading?: boolean;
  handlesubmit: () => void;
}

const SubmitBTN: React.FC<submitBTN> = ({
  label,
  styles = '',
  isLoading = false,
  handlesubmit,
}) => {
  return (
    <button
      className={twMerge(
        `bg-green-500 rounded-md py-3 px-8 flex items-center text-white font-medium text-lg ${styles}`,
      )}
      onClick={handlesubmit}
    >
      <Spinner white loading={isLoading} />
      <span>{label}</span>
    </button>
  );
};

export default SubmitBTN;

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Checkbox } from 'react-ionicons';
interface InputProps {
  placeholder: string;
  styles?: string;
}

const InputIcon: React.FC<InputProps> = ({ placeholder, styles }) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessaje, setErrorMessaje] = useState<string>('');

  const handlevalidation = () => {
    if (value.trim() === '') {
      setError(true);
      setErrorMessaje('Empty file');
    } else {
      setError(false);
      setSubmitted(true);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handlevalidation}
        className={twMerge(
          `border-2 p-2 rounded-md transition-colors duration-300 w-6/12 
          ${
            error
              ? 'border-red-500'
              : submitted
              ? 'border-green-500'
              : 'border-gray-300'
          } ${styles}`,
        )}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 ml-2">{errorMessaje}</p>
      )}
    </div>
  );
};

export default InputIcon;

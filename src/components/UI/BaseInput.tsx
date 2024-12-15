import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Checkbox } from 'react-ionicons';
interface InputProps {
  placeholder: string;
  handleValue: (value: string) => void;
  styles?: string;
  inputWidth?: string;
  defaultValue?: string | number;
  inputType?: string;
  multiline?: boolean;
  isautoFocus?: boolean;
}

const BaseInput: React.FC<InputProps> = ({
  placeholder,
  styles = '',
  inputWidth = '',
  handleValue,
  defaultValue,
  inputType = 'text',
  multiline,
  isautoFocus,
}) => {
  const [value, setValue] = useState<string | number>(defaultValue ?? '');
  const [error, setError] = useState<boolean>(false);
  const [check, setcheck] = useState<boolean>(false);
  const [errorMessaje, setErrorMessaje] = useState<string>('');

  const submitInfo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handlevalidation();
    }
  };
  const handlevalidation = () => {
    setcheck(false);
    if (typeof value == 'string') {
      if (value.trim() === '') {
        setError(true);
        setErrorMessaje('Empty file');
        return false;
      }
    } else {
      handleValue(value.toString());
      setError(false);
      setcheck(true);
    }
  };

  return (
    <div className={twMerge(`relative w-full fill-green-500 ${inputWidth}`)}>
      {multiline ? (
        <textarea
          className={twMerge(
            `border-2 p-2 rounded-md transition-colors duration-300 w-full
          ${
            error
              ? 'border-red-500'
              : check
              ? 'border-green-500'
              : 'border-gray-300'
          } ${styles}`,
          )}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={handlevalidation}
        ></textarea>
      ) : (
        <input
          autoFocus={isautoFocus}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={submitInfo}
          onBlur={handlevalidation}
          className={twMerge(
            `border-2 p-2 rounded-md transition-colors duration-300 w-full
          ${
            error
              ? 'border-red-500'
              : check
              ? 'border-green-500'
              : 'border-gray-300'
          } ${styles}`,
          )}
        />
      )}
      {check && (
        <Checkbox
          cssClasses={'absolute top-[8px] right-2 !fill-green-500'}
          height="25px"
          width="25px"
        />
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1 ml-2">{errorMessaje}</p>
      )}
    </div>
  );
};

export default BaseInput;

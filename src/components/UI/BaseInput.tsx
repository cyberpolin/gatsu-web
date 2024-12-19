import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Checkbox } from 'react-ionicons';
interface InputProps {
  name: string;
  placeholder: string;
  handleValue: React.ChangeEventHandler<HTMLInputElement>;
  styles?: string;
  inputWidth?: string;
  value: string | number;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
  check?: boolean;
}

const BaseInput: React.FC<InputProps> = ({
  name,
  placeholder,
  styles = '',
  inputWidth = '',
  handleValue,
  value,
  onBlur,
  errorMessage,
  check,
}) => {
  return (
    <div className={twMerge(`relative w-full fill-green-500 ${inputWidth}`)}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleValue}
        onBlur={onBlur}
        className={twMerge(
          `border-2 p-2 rounded-md transition-colors duration-300 w-full
          ${
            errorMessage
              ? 'border-red-500'
              : check
              ? 'border-green-500'
              : 'border-gray-300'
          } ${styles}`,
        )}
      />
      {check && (
        <Checkbox
          cssClasses={'absolute top-[8px] right-2 !fill-green-500'}
          height="25px"
          width="25px"
        />
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1 ml-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default BaseInput;

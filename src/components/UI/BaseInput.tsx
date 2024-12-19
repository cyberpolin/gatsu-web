import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Checkbox } from 'react-ionicons';
interface InputProps {
  name?: string;
  placeholder: string;
  handleValue?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  styles?: string;
  inputWidth?: string;
  value?: string | number;
  onBlur?: React.ChangeEventHandler;
  errorMessage?: string;
  check?: boolean;
  inputType?: string;
  multiline?: boolean;
  isautoFocus?: boolean;
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
  inputType = 'text',
  multiline = false,
  isautoFocus = false,
}) => {
  return (
    <div className={twMerge(`relative w-full fill-green-500 ${inputWidth}`)}>
      {multiline ? (
        <textarea
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
        ></textarea>
      ) : (
        <input
          name={name}
          autoFocus={isautoFocus}
          type={inputType}
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
      )}
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

import {
  ClassAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { JSX } from 'react/jsx-runtime';

type InputProps = {
  multiline?: boolean;
} & (JSX.IntrinsicAttributes &
  ClassAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement>) &
  (JSX.IntrinsicAttributes &
    ClassAttributes<HTMLTextAreaElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>);

export default (props: InputProps) => {
  const { name, multiline } = props;
  if (multiline)
    return (
      <textarea
        className="border border-gray-300 rounded-md p-2 w-full my-2"
        placeholder={name || 'Placeholder'}
        {...props}
      >
        {props.value}
      </textarea>
    );
  // else
  return (
    <input
      type="text"
      placeholder={name || 'Placeholder'}
      {...props}
      className={`border border-gray-300 rounded-md p-2 w-full my-2 ${
        props.className || ''
      }`}
    />
  );
};

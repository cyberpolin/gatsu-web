import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Checkbox } from 'react-ionicons';
import fetch from '../../utils/fetch';

interface Skill {
  id: string;
  name: string;
  [x: string]: string;
}

interface AutocompleteInput {
  placeholder: string;
  handleValue: (value: string) => void;
  styles?: string;
  inputWidth?: string;
}

const AutocompleteInput: React.FC<AutocompleteInput> = ({
  placeholder,
  styles = '',
  inputWidth = '',
  handleValue,
}) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [check, setcheck] = useState<boolean>(false);
  const [errorMessaje, setErrorMessaje] = useState<string>('');
  const spaceCharactersValue = value.replace(
    /[.*+?^=!:${}()|\[\]\/\\]/g,
    '\\$&',
  );
  const regex = new RegExp('^' + spaceCharactersValue, 'i');

  const getSkills = async () => {
    try {
      const { data } = await fetch.get('/skills');
      setSkills(data);
    } catch (error) {
      console.error(error);
    }
  };

  const postSkills = async (name: string) => {
    try {
      const { data } = await fetch.post('/skills', { name });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (skills.length == 0) {
      getSkills();
    }
    if (value) {
      const filteredSkills = skills.filter(({ name }: { name: string }) =>
        regex.test(name),
      );
      const Sugestion = filteredSkills[0]?.name;
      setSuggestions(Sugestion);
    } else {
      setSuggestions('');
    }
  }, [value]);

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setValue(suggestions);
    }
    if (event.key === 'Enter') {
      handlevalidation();
      const capitalizeValue = value.charAt(0).toUpperCase() + value.slice(1);
      handleValue(capitalizeValue);
      postSkills(capitalizeValue);
      getSkills();
      setValue('');
    }
  };

  const handlevalidation = () => {
    setcheck(false);
    if (value.trim() === '') {
      setError(true);
      setErrorMessaje('Empty file');
      return false;
    } else {
      setError(false);
      setcheck(true);
    }
  };

  return (
    <div className="w-full">
      <div className={twMerge(`relative w-full fill-green-500 ${inputWidth}`)}>
        <input
          className={twMerge(
            `capitalize absolute bg-transparent border-2 p-2 rounded-md transition-colors duration-300 w-full
        ${
          error
            ? 'border-red-500'
            : check
            ? 'border-green-500'
            : 'border-gray-300'
        } ${styles}`,
          )}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={handleKey}
          placeholder={placeholder}
          onBlur={handlevalidation}
        />
        <div className=" capitalize p-2 h-[44px] rounded-md border-2 border-transparent w-full text-gray-400">
          {suggestions}
        </div>
        {check && (
          <Checkbox
            cssClasses={'absolute top-[8px] right-2 !fill-green-500'}
            height="25px"
            width="25px"
          />
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 ml-2">{errorMessaje}</p>
      )}
    </div>
  );
};

export default AutocompleteInput;

import React from 'react';

type GeneralContainer = {
  title?: string | (() => JSX.Element);
  subTitle?: string | (() => JSX.Element);
  children: React.ReactNode;
};
const GeneralContainer: React.FC<GeneralContainer> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <div className="min-h-full p-4 m-2 sm:m-8 sm:p-8 bg-white border border-gray-200 rounded-md">
      <div className="flex justify-between items-center flex-wrap text-xl mb-12">
        {title &&
          (typeof title === 'function' ? (
            React.createElement(title)
          ) : (
            <h1 className="text-black font-semibold">{title}</h1>
          ))}
        {subTitle &&
          (typeof subTitle === 'function' ? (
            React.createElement(subTitle)
          ) : (
            <h3 className="text-black">{subTitle}</h3>
          ))}
      </div>
      {children}
    </div>
  );
};

export default GeneralContainer;

type GeneralContainer = {
  title?: string;
  subTitle?: string;
  label?: string;
  children: React.ReactNode;
};
const GeneralContainer: React.FC<GeneralContainer> = ({
  title,
  subTitle,
  label,
  children,
}) => {
  return (
    <div className=" min-h-full p-4 m-2 sm:m-8 sm:p-8 bg-white border border-gray-200 rounded-md">
      <div className="flex justify-between items-center flex-wrap text-xl mb-12">
        <h1 className="text-black font-semibold">{title}</h1>
        <span className="flex items-baseline">
          <span className="text-gray-400 text-sm mr-4">{label}</span>
          <h3 className="text-black">{subTitle}</h3>
        </span>
      </div>
      {children}
    </div>
  );
};

export default GeneralContainer;

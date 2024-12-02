import Spinner from './Spinner';

const Button = ({
  loading,
  children,
  ...props
}: {
  loading?: boolean;
  children: React.ReactNode;
  [x: string]: any;
}) => {
  return (
    <button
      {...props}
      className={`bg-green-500 text-white p-2 rounded-md w-full py-4 flex justify-center ${props.className}`}
    >
      <Spinner white loading={loading} /> {children}
    </button>
  );
};

export default Button;

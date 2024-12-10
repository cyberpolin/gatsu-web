import { Link } from 'react-router-dom';
import Input from '../components/UI/Input';
import { useState } from 'react';
import Button from '../components/UI/Button';

const Recovey = () => {
  //TODO: fix after implementation

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-slate-100">
      <div className="bg-[url('assets/img/gatsu-logo.png')] bg-contain bg-no-repeat bg-center w-1/2 h-16" />
      <div
        className="
        border w-2/3 md:w-1/2 lg:w-1/3 bg-white px-14 py-16 rounded-md m-8
        text-center
      "
      >
        <h2 className="font-semibold mb-2 text-slate-900">
          Forgot your password?
        </h2>
        <p className="mb-8 text-slate-600 text-sm ">
          Please enter your email address and we will send you a link to reset
          your password.
        </p>
        <form>
          <Input className="mr-2" name="Email" />
          <Button white loading={loading}>
            {' '}
            Recovery password
          </Button>
        </form>
        <Link className="text-green-600 underline text-sm " to="/login">
          I have my password, want to log in
        </Link>
      </div>
    </div>
  );
};

export default Recovey;

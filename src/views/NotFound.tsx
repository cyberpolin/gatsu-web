import { Link } from 'react-router-dom';

const NotFound = () => {
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
          Ooops we can't find that page
        </h2>
        <p className="mb-8 text-slate-600 text-8xl ">404</p>

        <Link className="text-green-600 underline text-sm " to="/">
          Please go to the home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

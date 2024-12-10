import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { useEffect, useState } from 'react';
import useAuth from '../utils/hooks/UseAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { hasFirstUser, login, user, loading, error } = useAuth();

  const { search } = useLocation();

  const navigate = useNavigate();

  const redirect = new URLSearchParams(search).get('redirect');

  useEffect(() => {
    if (user?.loaded && user?.user && redirect) {
      navigate(redirect);
    }
  }, [user, redirect, navigate]);

  const title = !hasFirstUser ? 'Log In' : 'Create your first user';
  const subTitle = !hasFirstUser
    ? 'Welcome, are you ready to success?'
    : 'This is your first time, please create your first user, this will have all admin access.';
  const buttonText = !hasFirstUser ? 'Log In' : 'Create User';
  const showUserName = hasFirstUser;

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-slate-100">
      <div className="bg-[url('assets/img/gatsu-logo.png')] bg-contain bg-no-repeat bg-center w-1/2 h-12" />
      <div
        className="
        border w-2/3 md:w-1/2 lg:w-1/3 bg-white px-14 py-16 rounded-md m-8
        text-center
      "
      >
        <h2 className="font-semibold mb-2 text-slate-900">{title}</h2>
        <p className="mb-8 text-slate-600 text-sm ">{subTitle}</p>
        <form>
          {showUserName && (
            <Input
              className="mr-2"
              name="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <Input
            className="mr-2"
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="mr-2"
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </p>
          <Button
            className={'my-4'}
            loading={loading}
            onClick={async (e: any) => {
              e.preventDefault();
              try {
                //@ts-ignore
                await login({ email, password, username });
              } catch (error: any) {
                console.log('error', error);
              }
            }}
          >
            {buttonText}
          </Button>
        </form>
        <Link
          className="text-green-600 underline text-sm "
          to="/recovery-password"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default Login;

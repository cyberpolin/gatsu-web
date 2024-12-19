import { useEffect, useState } from 'react';
import { UserType, StorageUser } from '../types';
import fetch from '../fetch';

const useAuth = () => {
  const [user, setUser] = useState<StorageUser | null>(null);
  const [hasFirstUser, setHasFirstUser] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  console.log('D user', user);

  useEffect(() => {
    const firstUser = localStorage.getItem('firstUser');
    if (firstUser) {
      setHasFirstUser(true);
    } else {
      setHasFirstUser(false);
    }
    getUser();
  }, []);

  const createUser = (user: UserType) => {
    console.log('creating user', user);
    try {
      if (user.access_token) {
        console.log('before local storage');
        localStorage.setItem('gatsu-user', JSON.stringify(user));
        console.log('AFTER local storage');
        console.log('before set user');
        setUser({
          loaded: true,
          user,
        });
        console.log('after set user');
        console.log('before fetch header');
        fetch.defaults.headers.common['Authorization'] = user.access_token;
        console.log('after fetch header');
      }
    } catch (error) {
      console.log('error creating user', error);
      return error;
    }
  };

  const destroyUser = () => {
    try {
      localStorage.removeItem('gatsu-user');
    } catch (error) {
      return error;
    } finally {
      setUser(null);
    }
  };

  const getUser = () => {
    let user = localStorage.getItem('gatsu-user');
    const userJson: { loaded?: boolean; user?: UserType } = { loaded: true };
    if (user) {
      userJson.user = JSON.parse(user);
    }
    //@ts-ignore
    setUser(userJson);
  };

  const login = async ({ email, password, username }: UserType) => {
    setLoading(true);
    console.log('this is login');
    if (!hasFirstUser && username) {
      console.log('has first user');
      await register({ email, password, username });
      setLoading(false);
    } else {
      console.log('regular login');
      try {
        console.log('trying to login');
        const { data } = await fetch.post('/login', { email, password });
        console.log('data', data);
        createUser(data);
        console.log('after create user');
        setLoading(false);
      } catch (error) {
        console.error('>>>', error);
        setError('Invalid credentials');
      }
    }
  };

  const register = async ({ email, password, username }: UserType) => {
    setLoading(true);
    try {
      const { data } = await fetch.post('/register', {
        email,
        password,
        username,
      });

      createUser(data);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    createUser,
    destroyUser,
    getUser,
    login,
    register,
    hasFirstUser,
    user,
    loading,
    error,
  };
};

export default useAuth;

import { useEffect, useState } from 'react';
import { UserType, StorageUser } from '../types';
import fetch from '../fetch';

const useAuth = () => {
  const [user, setUser] = useState<StorageUser | null>(null);
  const [hasFirstUser, setHasFirstUser] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    try {
      const res = localStorage.setItem('gatsu-user', JSON.stringify(user));
      setUser({
        loaded: true,
        user,
      });
    } catch (error) {
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
    if (!hasFirstUser && username) {
      await register({ email, password, username });
    } else {
      try {
        const { data } = await fetch.post('/login', { email, password });
        console.log('data', data);
        createUser(data);
      } catch (error) {
        setError('Invalid credentials');
        console.error(error);
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

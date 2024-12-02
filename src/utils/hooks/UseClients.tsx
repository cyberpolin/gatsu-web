import fetch from '../fetch';
import { useEffect, useState } from 'react';

type Client = {
  id?: string;
  name: string;
  email: string;
};

const url = '/clients';

const useEntries = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const { data } = await fetch.get(url);

      setClients(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClient = async (id: string) => {
    const { data } = await fetch.get(`${url}/${id}`);
    return data;
  };

  const addClient = async (payload: Client, cb?: () => void) => {
    await fetch.post(url, payload);
    cb && cb();
    getClients();
  };

  const updateClient = async (id: string, payload: Client) => {
    await fetch.put(`${url}/${id}`, payload);
    getClients();
  };

  const deleteClient = async (id: string) => {
    await fetch.delete(`${url}/${id}`);
    getClients();
  };

  return {
    clients,
    getClients,
    getClient,
    addClient,
    updateClient,
    deleteClient,
  };
};

export default useEntries;

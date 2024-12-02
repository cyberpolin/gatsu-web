import { useEffect, useState } from 'react';

export type ClientType = {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
};

export default (phone?: string) => {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [client, setClient] = useState<ClientType | undefined>(undefined);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (phone) {
      fetchClient();
    }
  }, [phone, clients]);

  const fetchClients = () => {
    const clients = localStorage.getItem('clients');
    setClients((prev) => {
      return clients ? JSON.parse(clients) : prev;
    });
    return clients ?? [];
  };

  const fetchClient = () => {
    const client = clients.filter((client) => client.phone === phone) || {};
    setClient(client[0]);
  };

  const addClient = (client: ClientType) => {
    clients.push(client);
    try {
      localStorage.setItem('clients', JSON.stringify(clients));
      fetchClients();
      return true;
    } catch (error) {
      console.log('error', error);
    }
  };

  const removeClient = (index: number) => {
    clients.splice(index, 1);
    localStorage.setItem('clients', JSON.stringify(clients));
  };

  const updateClient = (index: number, client: ClientType) => {
    clients[index] = client;
    localStorage.setItem('clients', JSON.stringify(clients));
  };

  const clientExists = (phone: string) => {
    return clients.some((client) => client.phone === phone);
  };

  return {
    addClient,
    removeClient,
    updateClient,
    fetchClient,
    clientExists,
    clients,
    client,
  };
};

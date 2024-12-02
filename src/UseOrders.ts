import { useEffect, useMemo, useState } from 'react';

export type ItemType = {
  name: string;
  quantity: number;
  price: number;
};

export type OrderType = {
  id: string;
  clientId: string;
  items: ItemType[];
  total: number;
  date: string;
};

export default (clientId?: string) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [order, setOrder] = useState<OrderType | undefined>(undefined);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchOrder();
  }, [clientId]);

  const ordersByClient = orders.filter((order) => order.clientId === clientId);

  const fetchOrders = () => {
    const orders = localStorage.getItem('orders');
    setOrders(orders ? JSON.parse(orders) : []);
  };

  const fetchOrder = () => {
    const order = orders.filter((order) => order.id === clientId)[0];
    setOrder(order);
    return order;
  };

  const addOrder = (order: OrderType) => {
    orders.push(order);
    try {
      localStorage.setItem('orders', JSON.stringify(orders));
      fetchOrders();
      return true;
    } catch (error) {
      console.log('error', error);
    }
  };

  // const fetchClient = (phone: string) => {
  //   fetchClients();
  //   const client = clients.filter((client) => client.phone === phone)[0];
  //   return client;
  // };

  // const addClient = (client: ClientType) => {
  //   clients.push(client);
  //   console.log('clients to add', clients);
  //   try {
  //     localStorage.setItem('clients', JSON.stringify(clients));
  //     fetchClients();
  //     return true;
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // const removeClient = (index: number) => {
  //   clients.splice(index, 1);
  //   localStorage.setItem('clients', JSON.stringify(clients));
  // };

  // const updateClient = (index: number, client: ClientType) => {
  //   clients[index] = client;
  //   localStorage.setItem('clients', JSON.stringify(clients));
  // };

  console.log(' hooke orders', { orders, order });
  return {
    addOrder,
    fetchOrders,
    orders: ordersByClient,
    order,
  };
};

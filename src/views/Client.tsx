import { Link, useNavigate, useParams } from 'react-router-dom';
import '../App.css';

import useClients, { ClientType } from '../UseClients';
import useOrders from '../UseOrders';
import { useCallback, useEffect, useMemo, useState } from 'react';

function ClientCrud() {
  const navigate = useNavigate();
  const { phone } = useParams() || { phone: '' };
  const { client } = useClients(phone);
  const { orders } = useOrders(phone);
  console.log(orders);

  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-start
      min-h-screen
      bg-gray-100
      p-4
    "
    >
      {/* Top navigation like mobile with back button */}
      <div
        className="
        w-full
        flex
        items-center
        justify-between
        border-b
      "
      >
        <a onClick={() => navigate(-1)} href="#">
          Back
        </a>
        <Link to="./orders/new">New Order</Link>
      </div>
      {client && (
        <>
          <h1 className="text-4xl font-bold text-center mt-4 mb-6">
            {client?.name || ''}
          </h1>
          <p>{client.phone || ''}</p>
          <p>{client.email || ''}</p>
          <p>{client.notes || ''}</p>

          <h2 className=" text-2xl font-medium mt-6 mb-4 ">
            Ultimos 5 pedidos...
          </h2>
          <ul className="w-full">
            {orders.map((order) => (
              <li
                key={order.id}
                className="
                flex
                items-center
                justify-between
                border-b
                p-2
              "
              >
                <p>{order.id}</p>
                <p>{order.total}</p>
                <p>{order.date}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ClientCrud;

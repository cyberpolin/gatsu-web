import { Link, useNavigate, useParams } from 'react-router-dom';
import '../App.css';

import useClients, { ClientType } from '../UseClients';
import { useCallback, useEffect, useMemo, useState } from 'react';

function Orders() {
  const navigate = useNavigate();
  const { phone } = useParams() || { phone: '' };
  const { client } = useClients(phone);

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
        <Link to="/orders/new">New Order</Link>
      </div>
      <h1>Ordersss</h1>
    </div>
  );
}

export default Orders;

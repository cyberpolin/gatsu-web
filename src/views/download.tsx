import { Link, useNavigate, useParams } from 'react-router-dom';
import '../App.css';

import useOrders from '../UseOrders';

const clients = localStorage.getItem('clients');

function Downloads() {
  const navigate = useNavigate();
  const { phone } = useParams() || { phone: '' };
  const { orders } = useOrders(phone);

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
      {/* save cliens as json */}
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(clients),
        )}`}
        download="clients.json"
      >
        Download Clients
      </a>
      {/* save orders as json */}
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(orders),
        )}`}
        download="orders.json"
      >
        Orders
      </a>
    </div>
  );
}

export default Downloads;

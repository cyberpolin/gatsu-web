import { Link, useNavigate, useParams } from 'react-router-dom';
import '../App.css';

import useOrders, { ItemType } from '../UseOrders';
import { useState } from 'react';

const AvailableItems = [
  {
    id: 1,
    name: 'Mojarra Frita',
    price: 150,
  },
  {
    id: 2,
    name: 'Mojarra Asada',
    price: 150,
  },
];

function OrdersCrud() {
  const navigate = useNavigate();
  const { addOrder } = useOrders();
  const [items, setItems] = useState<ItemType[]>([]);

  const { phone } = useParams() || { phone: '' };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
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
      <h1>Order CRUD</h1>

      <div className="w-full overflow-scroll">
        {AvailableItems.map((item, index) => (
          <div
            key={index}
            className="border-b py-2 hover:bg-gray-200 text-center flex flex-row justify-between"
          >
            <button
              className="py-4 px-8 bg-rose-100"
              onClick={() => {
                const newItems = [...items];
                newItems.splice(index, 1);
                setItems(newItems);
              }}
            >
              -
            </button>
            <div>
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-500">{`(${
                items.filter((i) => i.name === item.name).length
              }) $${item.price}`}</p>
            </div>
            <button
              onClick={() => setItems([...items, { ...item, quantity: 1 }])}
              className="py-4 px-8 bg-rose-100"
            >
              +
            </button>
          </div>
        ))}
        <h2>Total</h2>

        <p>$ {total}</p>
      </div>
      <button
        onClick={() => {
          try {
            addOrder({
              items,
              clientId: phone || '',
              date: new Date().toISOString(),
              id: new Date().toISOString(),
              total,
            });

            navigate('/clients/' + phone);
          } catch (error: any) {
            console.log('error', error.errors);
          }
        }}
      >
        Guardar
      </button>
    </div>
  );
}

export default OrdersCrud;

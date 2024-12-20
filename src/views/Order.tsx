import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Order() {
  const navigate = useNavigate();

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
      <h1>ORDER</h1>
    </div>
  );
}

export default Order;

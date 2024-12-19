import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { useState } from 'react';
import * as yup from 'yup';
import useClients from '../UseClients';
import BaseInput from '../components/UI/BaseInput';

function ClientCrud() {
  const navigate = useNavigate();
  const { addClient, clientExists } = useClients();

  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const exists = clientExists(phone);

  const clientScheme = yup.object().shape({
    name: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required().email(),
    notes: yup.string(),
  });

  try {
    clientScheme.isValid({ name, phone, email, notes });
  } catch (error: any) {
    console.log('error', error);
  }

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
      </div>

      <h1 className="text-4xl font-bold text-center mt-4 mb-6">
        Alta de cliente
      </h1>
      <BaseInput
        placeholder="name"
        handleValue={(e) => setName(e.target.value)}
        isautoFocus
      />
      <BaseInput
        inputType="tel"
        placeholder="phone"
        handleValue={(e) => setPhone(e.target.value)}
      />
      <BaseInput
        inputType="mail"
        placeholder="email"
        handleValue={(e) => setEmail(e.target.value)}
      />
      <BaseInput
        placeholder="notes"
        handleValue={(e) => setNotes(e.target.value)}
        multiline
      />
      {error && <p className="text-red-500">{error}</p>}

      {exists && (
        <>
          <p>El cliente ya existe</p>
          <button
            onClick={() => {
              navigate(`/clients/${phone}/orders/new`);
            }}
            className="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          mt-4"
          >
            {' '}
            Agregar pedido
          </button>
          <span>o</span>
          <Link to="/clients">Editar cliente</Link>
        </>
      )}
      {!exists && (
        <button
          onClick={async () => {
            try {
              await clientScheme.validate({ name, phone, email, notes });
              const res = addClient({ name, phone, email, notes });
              if (res) {
                navigate('/clients');
              }
            } catch (error: any) {
              console.log('error', error.errors);
              setError(error?.errors?.[0]);
            }
          }}
          className="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
        mt-4"
        >
          {' '}
          Guardar
        </button>
      )}
    </div>
  );
}

export default ClientCrud;

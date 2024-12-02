import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import Input from './components/UI/Input';
import useClients, { ClientType } from './UseClients';
import { useState } from 'react';
import { useFilter } from './UseFilter';

function App() {
  const [search, setSearch] = useState('');
  const { addClient, removeClient, updateClient, clients } = useClients();
  const { fuseSearch } = useFilter({ data: clients, searchTerm: search });

  const navigate = useNavigate();

  const listData = search
    ? fuseSearch.map((result: any) => result.item)
    : clients;

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
        <a onClick={() => console.log('go back')} href="#">
          Back
        </a>
        <Link to="/clients/new">New Client</Link>
      </div>

      <Input name="Buscar" onChange={(e) => setSearch(e.target.value)} />
      {/* propose a list of clients usinf clientData json should look like mobile */}
      <div className="w-full overflow-scroll">
        {listData.map((client: ClientType, index: number) => (
          <div
            key={index}
            className="border-b py-2 hover:bg-gray-200"
            onClick={() => navigate(`/clients/${client.phone}`)}
          >
            <h2 className="text-xl font-bold">{client.name}</h2>
            <p className="text-gray-500">{client.phone}</p>
          </div>
        ))}
        {search && listData.length < 3 && (
          <>
            <p>No encuentras al cliente?</p>
            <button onClick={() => navigate('/clients/new')}>
              Crear cliente
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

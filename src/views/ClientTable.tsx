import GeneralContainer from '../components/UI/GeneralContainer';
import BaseInput from '../components/UI/BaseInput';
import SubmitBTN from '../components/UI/SubmitBTN';
import fetch from '../utils/fetch';
import { useEffect, useState } from 'react';

type Client = {
  id: string;
  name: string;
  email: string;
  isDeleted?: boolean;
};
const ClientTable = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState({
    name: '',
    email: '',
    id: '',
  });
  const [error, setError] = useState({ email: '', name: '' });
  const getClients = async () => {
    try {
      const { data } = await fetch.get('/clients');
      setClients(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const deleteClient = async (id: string) => {
    try {
      await fetch.delete(`/clients/${id}`);
      getClients();
    } catch (error) {
      console.error(error);
    }
  };
  const updateClient = async (client: Client) => {
    if (currentClient.name.trim() !== '' || currentClient.email.trim() !== '') {
      const { name, email, id } = currentClient;
      try {
        await fetch.put(`/clients/${id}`, { name, email });
        getClients();
      } catch (error) {
        console.error(error);
      }
    } else {
      setError({
        email: 'Email is required',
        name: 'Name is required',
      });
    }
  };
  const comfirmDelete = (id: string) => {
    const confirmed = window.confirm('Are you sure to delete this client?');
    if (confirmed) {
      deleteClient(id);
    }
  };
  const openEdit = (id: string, name: string, email: string) => {
    setIsOpen(!isOpen);
    setCurrentClient({ name, email: '', id });
  };
  const secundaryBTN = (id: string) => {
    isOpen ? setIsOpen(!isOpen) : comfirmDelete(id);
  };
  const primaryBTN = (id: string, name: string, email: string) => {
    isOpen ? updateClient(currentClient) : openEdit(id, name, email);
  };
  const changeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentClient({ ...currentClient, name: e.target.value });
    setError({
      ...error,
      name: '',
    });
  };
  useEffect(() => {
    getClients();
  }, []);
  console.log('clients', clients);
  return (
    <GeneralContainer title="Team">
      <div className="overflow-x-scroll">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 w-14">
                Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 min-w-40">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map(({ id, name, email, isDeleted }) => (
              <tr key={id} className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4 text-sm text-gray-700">{name}</td>
                <td className="py-2 px-4 text-sm text-gray-700 truncate max-w-[150px] md:max-w-[10px]">
                  <span
                    className={`${
                      isOpen && id === currentClient.id
                        ? 'hidden'
                        : 'min-w-16 text-center sm:text-left'
                    }`}
                  >
                    {name}
                  </span>
                  {isOpen && id === currentClient.id && (
                    <BaseInput
                      handleValue={console.log}
                      placeholder="Edit your name"
                      defaultValue=""
                      inputWidth="flex-1"
                      // name="EditName"
                      // errorMessage={error.name}
                    />
                  )}
                </td>
                <td>
                  <div className="flex gap-2 flex-2">
                    <SubmitBTN
                      label={
                        isOpen && id === currentClient.id
                          ? 'Cancel'
                          : 'Delete ...'
                      }
                      handlesubmit={() => secundaryBTN(id)}
                      styles="bg-transparent text-red-500 hover:text-red-400"
                    />
                    <SubmitBTN
                      label={
                        isOpen && id === currentClient.id ? 'Save' : 'Edit'
                      }
                      styles="hover:bg-green-400"
                      handlesubmit={() => primaryBTN(id, name, email)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GeneralContainer>
  );
};
export default ClientTable;

import GeneralContainer from '../components/UI/GeneralContainer';
import BaseInput from '../components/UI/BaseInput';
import SubmitBTN from '../components/UI/SubmitBTN';
import fetch from '../utils/fetch';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

type Client = {
  id: string;
  name: string;
  email: string;
  isDeleted?: boolean;
};
const validation = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
});

const ClientTable = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState({
    name: '',
    email: '',
    id: '',
  });
  const [checked, setChecked] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: currentClient,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      setChecked(true);
      updateClient(currentClient.id, values.name, values.email);
      setTimeout(() => {
        resetForm();
        setChecked(false);
      }, 500);
    },
  });
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
  const updateClient = async (id: string, name: string, email: string) => {
    try {
      await fetch.patch(`/clients/${id}`, { name, email });
      console.log('updated', name, email);
      getClients();
    } catch (error) {
      console.error(error);
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
    setCurrentClient({ name, email, id });
  };
  const secundaryBTN = (id: string) => {
    isOpen ? setIsOpen(!isOpen) : comfirmDelete(id);
  };
  const primaryBTN = (id: string, name: string, email: string) => {
    isOpen ? formik.handleSubmit() : openEdit(id, name, email);
  };

  useEffect(() => {
    getClients();
  }, []);
  console.log('clients', currentClient);
  return (
    <GeneralContainer title="Clients">
      <div className="overflow-x-scroll">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 ">
                Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 ">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map(({ id, name, email, isDeleted }) => (
              <tr key={id} className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4 text-sm text-gray-700">
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
                      handleValue={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Edit name"
                      value={formik.values.name}
                      inputWidth="flex-1"
                      name="name"
                      errorMessage={formik.errors.name}
                      check={checked}
                    />
                  )}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700 truncate">
                  <span
                    className={`${
                      isOpen && id === currentClient.id
                        ? 'hidden'
                        : 'min-w-16 text-center sm:text-left'
                    }`}
                  >
                    {email}
                  </span>
                  {isOpen && id === currentClient.id && (
                    <BaseInput
                      handleValue={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Edit email"
                      value={formik.values.email}
                      inputWidth="flex-1"
                      name="email"
                      errorMessage={formik.errors.email}
                      check={checked}
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

import GeneralContainer from '../components/UI/GeneralContainer';
import BaseInput from '../components/UI/BaseInput';
import SubmitBTN from '../components/UI/SubmitBTN';
import fetch from '../utils/fetch';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

const validation = Yup.object({
  name: Yup.string().required('First Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});
const AddClient = () => {
  const [checked, setChecked] = useState(false);
  const SubmitClients = async (person: { name: string; email: string }) => {
    try {
      const { data } = await fetch.post('/clients', person);
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      setChecked(true);
      SubmitClients(values);
      setTimeout(() => {
        resetForm();
        setChecked(false);
      }, 500);
    },
  });
  return (
    <GeneralContainer title="Add Clients">
      <div>
        <span className="text-gray-800">Client information</span>
        <p className="text-gray-400 text-xs mt-2 mb-8">
          Please fill in the form to add a new client.
        </p>
        <div className="flex flex-col h-60 justify-between">
          <BaseInput
            placeholder="Clients Name"
            handleValue={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            value={formik.values.name}
            errorMessage={formik.errors.name}
            check={checked}
          />
          <BaseInput
            placeholder="Clients Email"
            handleValue={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            value={formik.values.email}
            errorMessage={formik.errors.email}
            check={checked}
          />
          <div className="flex justify-end flex-wrap py-5 items-center gap-y-4 md:gap-y-0 gap-x-2">
            <SubmitBTN label="save" handlesubmit={formik.handleSubmit} />
          </div>
        </div>
      </div>
    </GeneralContainer>
  );
};

export default AddClient;

import GeneralContainer from '../components/UI/GeneralContainer';
import BaseInput from '../components/UI/BaseInput';
import SubmitBTN from '../components/UI/SubmitBTN';
import fetch from '../utils/fetch';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validation = Yup.object({
  name: Yup.string().required('First Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});
const AddClients = () => {
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
      SubmitClients(values);
    },
  });
  return (
    <GeneralContainer title="Add Clients">
      <BaseInput
        placeholder="Clients Name"
        handleValue={formik.handleChange}
        onBlur={formik.handleBlur}
        name="name"
        value={formik.values.name}
        errorMessage={formik.errors.name}
      />
      <BaseInput
        placeholder="Clients Email"
        handleValue={formik.handleChange}
        onBlur={formik.handleBlur}
        name="name"
        value={formik.values.email}
        errorMessage={formik.errors.email}
      />
      <SubmitBTN label="Save" handlesubmit={formik.handleSubmit}></SubmitBTN>
    </GeneralContainer>
  );
};

export default AddClients;

import GeneralContainer from '../components/UI/GeneralContainer';
import BaseInput from '../components/UI/BaseInput';
import SubmitBTN from '../components/UI/SubmitBTN';
import fetch from '../utils/fetch';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

const validation = Yup.object({
  name: Yup.string().required('First Name is required'),
  description: Yup.string().required('Description is required'),
  clientId: Yup.string().required('Client is required'),
});
const AddProject = () => {
  const [checked, setChecked] = useState(false);
  const SubmitProjects = async (projects: {
    name: string;
    description: string;
    clientId: string;
  }) => {
    try {
      const { data } = await fetch.post('/projects', projects);
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      clientId: '6282378f-3080-438e-ab9b-8ec4db198393',
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      setChecked(true);
      SubmitProjects(values);
      setTimeout(() => {
        resetForm();
        setChecked(false);
      }, 500);
    },
  });
  return (
    <GeneralContainer title="Add Projects">
      <div>
        <span className="text-gray-800">Projects information</span>
        <p className="text-gray-400 text-xs mt-2 mb-8">
          Please fill in the form to add a new Project.
        </p>
        <div className="flex flex-col h-60 justify-between">
          <BaseInput
            placeholder="Project Name"
            handleValue={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            value={formik.values.name}
            errorMessage={formik.errors.name}
            check={checked}
          />
          <BaseInput
            placeholder="Project Description"
            handleValue={formik.handleChange}
            onBlur={formik.handleBlur}
            name="description"
            value={formik.values.description}
            errorMessage={formik.errors.description}
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

export default AddProject;

import BaseInput from '../components/UI/BaseInput';
import Tag from '../components/UI/Tag';
import SubmitBTN from '../components/UI/SubmitBTN';
import AutocompleteInput from '../components/UI/AutocompleteInput';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

type Member = {
  name: string;
  lastname: string;
  email: string;
  hourlyRate: number;
};
const validationMenber = Yup.object({
  name: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  hourlyRate: Yup.number().required('Hourly rate is required'),
});

const AddMember = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const formik = useFormik<Member>({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      hourlyRate: 0,
    },
    validationSchema: validationMenber,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      setChecked(true);
      console.log(values);
      setTimeout(() => {
        resetForm();
        setChecked(false);
      }, 500);
    },
  });

  return (
    <div className="mx-auto px-8 bg-white border border-gray-100 rounded-md">
      <h1 className="text-xl font-medium mt-5 mb-6">Add team member</h1>
      <div className="flex flex-col justify-between gap-y-20">
        <div>
          <span className="text-gray-800">Personal information</span>
          <p className="text-gray-400 text-xs mt-2 mb-8">
            We will send you a temporary url at your mail, so you can set your
            password and login to your dashboard.
          </p>
          <div className="flex flex-col h-60 justify-between">
            <BaseInput
              value={formik.values.name}
              handleValue={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Name"
              name="name"
              errorMessage={formik.errors.name}
              check={checked}
            />
            <BaseInput
              value={formik.values.lastname}
              handleValue={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Lastname"
              name="lastname"
              errorMessage={formik.errors.lastname}
              check={checked}
            />
            <BaseInput
              value={formik.values.email}
              handleValue={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              name="email"
              errorMessage={formik.errors.email}
              check={checked}
            />
          </div>
        </div>
        <div>
          <span className="text-gray-800">Skills</span>
          <p className="text-gray-400 text-xs mt-2 mb-8">
            Please add all skills you can work with, i.e. JS, Node, Css.You can
            add as many as you like, just be sure you are work ready on that
            skill.
          </p>
          <AutocompleteInput
            styles="placeholder:text-[11px] xs:placeholder:text-base"
            placeholder="Add a tag and press enter"
            handleValue={(newValue: string) => {
              const value = newValue.split(/[, ]+/);
              setSkills((oldValue) => [...oldValue, ...value]);
            }}
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {skills.map((skill, index) => (
              <Tag
                key={index + skill}
                label={skill}
                handleClose={() => {
                  const value = skills.filter((item) => item !== skill);
                  setSkills((prev) => [...value]);
                }}
              />
            ))}
          </div>
        </div>
        <div className="">
          <span className="text-gray-800">Hourly rate</span>
          <p className="text-gray-400 text-xs mt-2 mb-8">
            Let us know what’s your hourly rate, we will review it, and make you
            a final proposal.If you already talked to a representative, please
            write the amount previous agreed.
          </p>
          <BaseInput
            value={formik.values.hourlyRate}
            handleValue={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="10"
            name="hourlyRate"
            errorMessage={formik.errors.hourlyRate}
            check={checked}
          />
        </div>
        <div className="flex justify-center xs:justify-end   flex-wrap py-5 items-center gap-y-4 md:gap-y-0 gap-x-2">
          <SubmitBTN
            label="not now ..."
            handlesubmit={() => console.log('hola')}
            styles="bg-transparent text-black "
          />
          <SubmitBTN label="Add menber" handlesubmit={formik.handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AddMember;

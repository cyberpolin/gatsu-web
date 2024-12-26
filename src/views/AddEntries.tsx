import GeneralContainer from '../components/UI/GeneralContainer';
import BaseInput from '../components/UI/BaseInput';
import SubmitBTN from '../components/UI/SubmitBTN';
import PickDate from '../components/PickDate';
import ProjectSelector from './tasks/ProjectSelector';
import fetch from '../utils/fetch';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

const validation = Yup.object({
  task: Yup.string().required('Task is required'),
  hours: Yup.number().required('Hours is required'),
  date: Yup.date().required('Date is required'),
  projectId: Yup.string().required('Project is required'),
});
const AddEntires = () => {
  const [task, setTask] = useState('');
  const [hours, setHours] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [checked, setChecked] = useState(false);
  const SubmitEntries = async (entry: {
    task: string;
    hours: number;
    date: Date;
    projectId: string;
  }) => {
    try {
      await fetch.post('/tasks', entry);
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      task: task,
      hours: hours,
      date: selectedDate,
      projectId: selectedProject,
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      setChecked(true);
      SubmitEntries(values);
      setTimeout(() => {
        resetForm();
        setTask('');
        setHours(0);
        setChecked(false);
      }, 500);
    },
  });
  return (
    <GeneralContainer title="Add Entries">
      <div className="">
        <span className="text-gray-800">Entry information</span>
        <p className="text-gray-400 text-xs mt-2 mb-8">
          Please fill in the form to add a new entry.
        </p>
        <div className="flex flex-col gap-y-8">
          <BaseInput
            placeholder="Clients Task"
            handleValue={(e) => setTask(e.target.value)}
            onBlur={formik.handleBlur}
            name="task"
            value={formik.values.task}
            errorMessage={formik.errors.task}
            check={checked}
          />
          <BaseInput
            placeholder="Clients Hours"
            inputType="number"
            handleValue={(e) => setHours(Number(e.target.value))}
            onBlur={formik.handleBlur}
            name="hours"
            value={formik.values.hours}
            errorMessage={formik.errors.hours}
            check={checked}
          />
          <ProjectSelector
            selectedProject={selectedProject}
            onProjectSelected={(project) => setSelectedProject(project)}
          />
          <PickDate
            selectedDate={selectedDate}
            onDateSelected={(date) => {
              setSelectedDate(date);
            }}
          />
          <div className="flex justify-end flex-wrap py-5 items-center gap-y-4 md:gap-y-0 gap-x-2">
            <SubmitBTN label="save" handlesubmit={formik.handleSubmit} />
          </div>
        </div>
      </div>
    </GeneralContainer>
  );
};

export default AddEntires;

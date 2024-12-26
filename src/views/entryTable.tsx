import GeneralContainer from '../components/UI/GeneralContainer';
import BaseInput from '../components/UI/BaseInput';
import SubmitBTN from '../components/UI/SubmitBTN';
import SkeletonRow from '../components/SkeletonRow';
import fetch from '../utils/fetch';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PickDate from '../components/PickDate';

type Entry = {
  id: string;
  task: string;
  hours: number;
  date: Date;
};
const validation = Yup.object().shape({
  task: Yup.string().required(),
  hours: Yup.number().required(),
  date: Yup.date().required(),
});

const EntryTable = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    task: '',
    hours: 0,
    date: new Date(),
    id: '',
  });
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: currentEntry,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      setChecked(true);
      updateEntries({
        ...values,
        id: currentEntry.id,
      });
      setTimeout(() => {
        resetForm();
        setChecked(false);
        setIsOpen(false);
      }, 500);
    },
  });
  const getEntries = async () => {
    setLoading(true);
    try {
      const { data } = await fetch.get(
        '/tasks/project/9ce3becf-95d2-4e1e-8312-dc34906a6af2',
      );
      setEntries(data);
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteEntry = async (id: string) => {
    try {
      await fetch.delete(`/tasks/${id}`);
      getEntries();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const updateEntries = async (entry: Entry) => {
    try {
      await fetch.patch(`/tasks/${entry.id}`, entry);
      getEntries();
    } catch (error) {
      console.error(error);
    }
  };
  const comfirmDelete = (id: string) => {
    const confirmed = window.confirm('Are you sure to delete this entry?');
    if (confirmed) {
      deleteEntry(id);
    }
  };
  const openEdit = (entry: Entry) => {
    setIsOpen(!isOpen);
    setCurrentEntry(entry);
  };
  const secundaryBTN = (id: string) => {
    isOpen ? setIsOpen(!isOpen) : comfirmDelete(id);
  };
  const primaryBTN = (entry: Entry) => {
    isOpen ? formik.handleSubmit() : openEdit(entry);
  };

  useEffect(() => {
    getEntries();
  }, []);
  console.log('currentEntry', currentEntry);
  return (
    <GeneralContainer title="Entries">
      <div className="overflow-x-scroll">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 ">
                Task
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 ">
                Hours
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 ">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map(({ id, task, hours, date }) => (
              <tr key={id} className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4 text-sm text-gray-700 w-1/3">
                  <span
                    className={`${
                      isOpen && id === currentEntry.id
                        ? 'hidden'
                        : 'min-w-16 text-center sm:text-left'
                    }`}
                  >
                    {task}
                  </span>
                  {isOpen && id === currentEntry.id && (
                    <BaseInput
                      handleValue={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Edit task"
                      value={formik.values.task}
                      inputWidth="flex-1"
                      name="task"
                      errorMessage={formik.errors.task}
                      check={checked}
                    />
                  )}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700 truncate w-1/3">
                  <span
                    className={`${
                      isOpen && id === currentEntry.id
                        ? 'hidden'
                        : 'min-w-16 text-center sm:text-left'
                    }`}
                  >
                    {hours}
                  </span>
                  {isOpen && id === currentEntry.id && (
                    <BaseInput
                      handleValue={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Edit hours"
                      value={formik.values.hours}
                      inputWidth="flex-1"
                      inputType="number"
                      name="hours"
                      errorMessage={formik.errors.hours}
                      check={checked}
                    />
                  )}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700 truncate w-1/3">
                  <span
                    className={`${
                      isOpen && id === currentEntry.id
                        ? 'hidden'
                        : 'min-w-16 text-center sm:text-left'
                    }`}
                  >
                    {date.toString()}
                  </span>
                  {isOpen && id === currentEntry.id && (
                    <PickDate
                      selectedDate={formik.values.date}
                      onDateSelected={(e) =>
                        setCurrentEntry({ ...currentEntry, date: e })
                      }
                    />
                  )}
                </td>
                <td className="py-2 px-4 w-1/3">
                  <div className="flex gap-2 flex-2">
                    <SubmitBTN
                      label={
                        isOpen && id === currentEntry.id
                          ? 'Cancel'
                          : 'Delete ...'
                      }
                      handlesubmit={() => secundaryBTN(id)}
                      styles="bg-transparent text-red-500 hover:text-red-400 h-10"
                    />
                    <SubmitBTN
                      label={isOpen && id === currentEntry.id ? 'Save' : 'Edit'}
                      styles="hover:bg-green-400 h-10"
                      handlesubmit={() => primaryBTN({ id, task, hours, date })}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {loading && (
              <>
                <SkeletonRow
                  elementLength={entries.length}
                  content={[
                    { td: 'w-1/3', skeleton: 'w-full' },
                    { td: 'w-1/3', skeleton: 'w-full' },
                    { td: 'w-1/3', skeleton: 'w-full' },
                  ]}
                />
              </>
            )}
          </tbody>
        </table>
      </div>
    </GeneralContainer>
  );
};

export default EntryTable;

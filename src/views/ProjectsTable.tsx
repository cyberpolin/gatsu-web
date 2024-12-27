import GeneralContainer from '../components/UI/GeneralContainer';
import BaseInput from '../components/UI/BaseInput';
import SubmitBTN from '../components/UI/SubmitBTN';
import SkeletonRow from '../components/SkeletonRow';
import fetch from '../utils/fetch';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

type Projects = {
  id: string;
  name: string;
  description: string;
  isDeleted?: boolean;
  clientId: string;
};
const validation = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  clientId: Yup.string(),
});

const ProjectsTable = () => {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    name: '',
    description: '',
    clientId: '',
    id: '',
  });
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: currentProject,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { resetForm }) => {
      setChecked(true);
      updateProject(currentProject.id, values.name, values.description);
      setTimeout(() => {
        resetForm();
        setChecked(false);
        setIsOpen(false);
      }, 500);
    },
  });
  const getProjects = async () => {
    setLoading(true);
    try {
      const { data } = await fetch.get('/projects');
      const activeProjects = data.filter((value: Projects) => !value.isDeleted);
      setProjects(activeProjects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteProject = async (id: string) => {
    try {
      await fetch.delete(`/projects/${id}`);
      getProjects();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const updateProject = async (
    id: string,
    name: string,
    description: string,
  ) => {
    try {
      await fetch.patch(`/projects/${id}`, { name, description });
      getProjects();
    } catch (error) {
      console.error(error);
    }
  };
  const comfirmDelete = (id: string) => {
    const confirmed = window.confirm('Are you sure to delete this Project?');
    if (confirmed) {
      deleteProject(id);
    }
  };
  const openEdit = (
    id: string,
    name: string,
    description: string,
    clientId: string,
  ) => {
    setIsOpen(!isOpen);
    setCurrentProject({ name, description, id, clientId });
  };
  const secundaryBTN = (id: string) => {
    isOpen ? setIsOpen(!isOpen) : comfirmDelete(id);
  };
  const primaryBTN = (
    id: string,
    name: string,
    description: string,
    clientId: string,
  ) => {
    isOpen ? formik.handleSubmit() : openEdit(id, name, description, clientId);
  };

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <GeneralContainer title="Projects">
      <div className="overflow-x-scroll">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 ">
                Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 ">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map(({ id, name, description, clientId }) => (
              <tr key={id} className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4 text-sm text-gray-700 w-1/3">
                  <span
                    className={`${
                      isOpen && id === currentProject.id
                        ? 'hidden'
                        : 'min-w-16 text-center sm:text-left'
                    }`}
                  >
                    {name}
                  </span>
                  {isOpen && id === currentProject.id && (
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
                <td className="py-2 px-4 text-sm text-gray-700 truncate w-1/3">
                  <span
                    className={`${
                      isOpen && id === currentProject.id
                        ? 'hidden'
                        : 'min-w-16 text-center sm:text-left'
                    }`}
                  >
                    {description}
                  </span>
                  {isOpen && id === currentProject.id && (
                    <BaseInput
                      handleValue={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Edit description"
                      value={formik.values.description}
                      inputWidth="flex-1"
                      name="description"
                      errorMessage={formik.errors.description}
                      check={checked}
                    />
                  )}
                </td>
                <td className="py-2 px-4 w-1/3">
                  <div className="flex gap-2 flex-2">
                    <SubmitBTN
                      label={
                        isOpen && id === currentProject.id
                          ? 'Cancel'
                          : 'Delete ...'
                      }
                      handlesubmit={() => secundaryBTN(id)}
                      styles="bg-transparent text-red-500 hover:text-red-400 h-10"
                    />
                    <SubmitBTN
                      label={
                        isOpen && id === currentProject.id ? 'Save' : 'Edit'
                      }
                      styles="hover:bg-green-400 h-10"
                      handlesubmit={() =>
                        primaryBTN(id, name, description, clientId)
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
            {loading && (
              <>
                <SkeletonRow
                  elementLength={projects.length}
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

export default ProjectsTable;

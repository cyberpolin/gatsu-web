import { Link, useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/UI/Input';
import { useState } from 'react';
import UseClients from '../../utils/hooks/UseClients';
import { AddOutline } from 'react-ionicons';
import useProjects from '../../utils/hooks/UseProjects';
import Button from '../../components/UI/Button';

function Clients() {
  const navigate = useNavigate();
  const { clients, addClient } = UseClients();
  const { projects, addProject } = useProjects();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [projectName, setProjectName] = useState('');
  const projectsByClient = (id?: string) => {
    return projects.filter((project) => project.clientId === id) || [];
  };

  const cleanForm = () => {
    setEmail('');
    setName('');
  };

  const addSelectedClient = (id: string) => {
    setSelectedClients([...selectedClients, id]);
  };

  const removeSelectedClient = (id: string) => {
    setSelectedClients(selectedClients.filter((clientId) => clientId !== id));
  };

  const toggleSelectedClient = (id: string) => {
    if (selectedClients.includes(id)) {
      removeSelectedClient(id);
    } else {
      addSelectedClient(id);
    }
  };
  const isSelected = (id: string) => selectedClients.includes(id);

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
      <div className="border w-full rounded-md p-10 mt-6 bg-slate-50 ">
        <div className="border p-2">
          <div className=" grid grid-cols-3 gap-3">
            <Input
              name="Clients name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Input
              name="Clients email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <Button
              onClick={() => {
                if (email && name) {
                  addClient({ name, email }, cleanForm);
                }
              }}
              className="bg-green-500 bg-gree text-white p-2 rounded-md"
            >
              Guardar
            </Button>
          </div>
        </div>
        <div className="p-2 mt-4">
          <h2 className="text-xl font-bold">Entradas</h2>
          <ul>
            {clients.map(({ id, name, email }) => (
              <>
                <li
                  className="flex items-center justify-between border p-2"
                  key={id}
                >
                  <p>{name}</p>
                  <p>{email}</p>
                  {/* TODO: make this a component with colors and behaviours */}
                  <AddOutline
                    cssClasses={
                      'cursor-pointer hover:text-green-100 !text-green-500 hover:shadow-md hover:rounded-full'
                    }
                    onClick={() => {
                      toggleSelectedClient(id || '');
                    }}
                    title={'Add Projects | Edit Client'}
                    height="20px"
                    width="20px"
                  />
                </li>
                <div
                  className={`${
                    isSelected(id || '') ? 'block' : 'hidden'
                  } bg-white border p-2 py-6 transition-all`}
                >
                  <h3 className="text-slate-300 text-sm bt-4 ">Add projects</h3>

                  {/* single input form to get the project name */}
                  <Input
                    name="Project name"
                    onChange={(e) => {
                      setProjectName(e.target.value);
                    }}
                  />
                  {/* enter ion icon */}
                  <AddOutline
                    cssClasses={
                      'cursor-pointer hover:text-green-100 !text-green-500 hover:shadow-md hover:rounded-full'
                    }
                    onClick={() => {
                      addProject({
                        name: projectName,
                        clientId: id,
                        description: '',
                      });
                    }}
                    title={'Add Projects'}
                    height="20px"
                    width="20px"
                  />

                  <h3 className="text-slate-300 text-sm bt-4 ">
                    Current Projects
                  </h3>
                  {
                    // list of projects
                    projectsByClient(id).map((project) => (
                      <div
                        className="items-center justify-between p-2 border-b"
                        key={project.id}
                      >
                        <span className="text-slate-300 text-sm ">
                          Project:
                        </span>
                        <p className="text-slate-700">{project.name}</p>
                        {project.description && (
                          <>
                            <span className="text-slate-300 text-sm ">
                              Description:
                            </span>
                            <p className="text-slate-600">
                              {project.description}
                            </p>
                          </>
                        )}
                      </div>
                    ))
                  }
                </div>
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Clients;

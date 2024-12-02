import { Link, useNavigate, useParams } from 'react-router-dom';
import useEntries from '../../utils/hooks/UseEntries';
import Input from '../../components/UI/Input';
import { useState } from 'react';
import { Calendar, CalendarOutline } from 'react-ionicons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PickDate from '../../components/PickDate';
import ProjectSelector from './ProjectSelector';
function Entries() {
  const navigate = useNavigate();
  const { entries, addEntry } = useEntries();

  const [task, setTask] = useState('');
  const [hours, setHours] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const cleanForm = () => {
    setTask('');
    setHours(0);
    setSelectedDate(null);
  };

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
      {/* Top navigation like mobile with back button */}
      <div
        className="
        w-full
        flex
        items-center
        justify-between
        border-b
      "
      >
        <a onClick={() => navigate(-1)} href="#">
          Back
        </a>
        <Link to="./orders/new">New Order</Link>
      </div>

      <div className="border w-full rounded-md p-10 mt-6 bg-slate-50 ">
        <div className="border p-2">
          <div className=" grid grid-cols-4 gap-4">
            <Input
              name="En que trabajaste hoy..."
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            <span className="flex ">
              <Input
                className="mr-2"
                name="Cuantas horas"
                onChange={(e) => setHours(parseInt(e.target.value))}
                value={hours}
              />
              <PickDate
                selectedDate={selectedDate}
                onDateSelected={(date) => {
                  setSelectedDate(date);
                }}
              />
            </span>
            <ProjectSelector
              selectedProject={selectedProject}
              onProjectSelected={(project) => setSelectedProject(project)}
            />
            <button
              onClick={() => {
                if (task && hours) {
                  addEntry(
                    {
                      task,
                      hours,
                      projectId: selectedProject || '',
                      date: selectedDate || new Date(),
                    },
                    cleanForm,
                  );
                }
              }}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Guardar
            </button>
          </div>
        </div>
        <div className="border p-2 mt-4">
          <h2 className="text-xl font-bold">Entradas</h2>
          <ul>
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between border-b p-2"
              >
                <p>{entry.task}</p>
                <p>{entry.hours}</p>
                <p>{entry?.project?.name}</p>
                <p>${entry.hours * 35}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Entries;

import useEntries from '../../utils/hooks/UseEntries';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import PickDate from '../../components/PickDate';
import ProjectSelector from './ProjectSelector';
import BaseInput from '../../components/UI/BaseInput';
function Entries() {
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
      <div className="border w-full rounded-md p-10 mt-6 bg-slate-50 ">
        <div className="border p-2">
          <div className=" grid grid-cols-4 gap-4">
            <BaseInput
              name="Task"
              placeholder="En que trabajaste hoy..."
              handleValue={(e) => setTask(e.target.value)}
              value={task}
            />
            <span className="flex gap-x-2">
              <BaseInput
                name="Hours"
                inputType="number"
                placeholder="Cuantas horas"
                value={hours}
                handleValue={(newValue) => setHours(() => Number(newValue))}
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

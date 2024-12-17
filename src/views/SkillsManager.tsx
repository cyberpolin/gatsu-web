import { set } from 'react-datepicker/dist/date_utils';
import fetch from '../utils/fetch';
import { useState, useEffect } from 'react';
import BaseInput from '../components/UI/BaseInput';

const TagsManager = () => {
  const [skills, setSkills] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({ id: '', name: '' });
  const getskills = async () => {
    try {
      const { data } = await fetch.get('/skills');
      setSkills(data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteSkill = async (id: string) => {
    try {
      await fetch.delete(`/skills/${id}`);
      getskills();
    } catch (error) {
      console.error(error);
    }
  };
  const updateSkill = async (id: string, name: string) => {
    try {
      // await fetch.put(`/skills/${id}`, { name });
      // getskills();
      console.log('id', id, 'name', name);
    } catch (error) {
      console.error(error);
    }
  };
  const toogleModal = () => {
    setIsOpen(!isOpen);
    setCurrentSkill({ id: '', name: '' });
    console.log('isOpen', isOpen);
  };
  const openModal = (id: string) => {
    setCurrentSkill({ id, name: '' });
    toogleModal();
  };
  useEffect(() => {
    getskills();
  }, []);
  return (
    <div>
      <dialog
        open={isOpen}
        className="z-1 bg-transparent backdrop-blur-sm absolute top-16 w-full h-full flex items-center justify-center"
      >
        <div className="rounded-md p-4 bg-gray-200 flex flex-col justify-evenly h-60 w-80">
          <span>Please type your change</span>
          <BaseInput
            handleValue={(value) =>
              setCurrentSkill({ ...currentSkill, name: value })
            }
            placeholder="skill"
          />
          <div className="flex gap-2 w-full justify-end">
            <button
              className="p-2 bg-red-500 rounded-md min-w-20 hover:bg-red-400"
              onClick={() => toogleModal()}
            >
              cancel
            </button>
            <button
              className="p-2 bg-green-500 rounded-md min-w-20 hover:bg-green-400"
              onClick={() => updateSkill(currentSkill.id, currentSkill.name)}
            >
              save
            </button>
          </div>
        </div>
      </dialog>
      <ul className="max-w-[500px] m-auto">
        {skills.map((task: any) => (
          <li
            className="border p-3 flex justify-between items-center"
            key={task.id}
          >
            {task.name}
            <div className="flex gap-2">
              <button
                className="p-2 bg-red-500 rounded-md min-w-20 hover:bg-red-400"
                onClick={() => deleteSkill(task.id)}
              >
                Delete
              </button>
              <button
                className="p-2 bg-green-500 rounded-md min-w-20 hover:bg-green-400"
                onClick={() => openModal(task.id)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsManager;

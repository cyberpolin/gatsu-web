import { set } from 'react-datepicker/dist/date_utils';
import fetch from '../utils/fetch';
import { useState, useEffect } from 'react';
import BaseInput from '../components/UI/BaseInput';

const TagsManager = () => {
  const [skills, setSkills] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({ id: '', name: '' });
  async function getSkills() {
    try {
      const { data } = await fetch.get('/skills');
      setSkills(data);
    } catch (error) {
      console.error(error);
    }
  }
  const deleteSkill = async (id: string) => {
    try {
      await fetch.delete(`/skills/${id}`);
      getSkills();
    } catch (error) {
      console.error(error);
    }
  };
  const updateSkill = async (id: string, name: string) => {
    try {
      await fetch.put(`/skills/${id}`, { name });
      getSkills();
    } catch (error) {
      console.error(error);
    }
  };
  const postSkills = async (name: string) => {
    try {
      const { data } = await fetch.post('/skills', { name });
      getSkills();
      return data;
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
    getSkills();
  }, []);
  return (
    <div>
      <dialog
        open={isOpen}
        className="bg-transparent backdrop-blur-sm w-full h-full content-center"
      >
        <div className="mx-auto rounded-md p-4 bg-gray-200 flex flex-col justify-evenly h-60 w-80">
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
      <div className="max-w-[500px] m-auto divide-y-8 divide-transparent">
        <BaseInput
          placeholder="Add a new skill"
          handleValue={(value) => postSkills(value)}
        />
        <ul>
          {skills.map((task: any) => (
            <li
              className="border p-3 flex flex-wrap justify-center sm:justify-between items-center"
              key={task.id}
            >
              <span className="min-w-16 text-center sm:text-left">
                {task.name}
              </span>
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
    </div>
  );
};

export default TagsManager;

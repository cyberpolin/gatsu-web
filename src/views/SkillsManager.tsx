import { set } from 'react-datepicker/dist/date_utils';
import fetch from '../utils/fetch';
import { useState, useEffect } from 'react';
import BaseInput from '../components/UI/BaseInput';
import SubmitBTN from '../components/UI/SubmitBTN';

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
  const toogle = () => {
    setIsOpen(!isOpen);
  };
  const openEdit = (id: string, name: string) => {
    setCurrentSkill((prev) => ({ id, name }));
    toogle();
  };
  const secundaryBTN = (id: string) => {
    isOpen ? toogle() : deleteSkill(id);
  };
  const primaryBTN = (id: string, name: string) => {
    openEdit(id, name);
  };

  useEffect(() => {
    getSkills();
  }, []);

  console.log(currentSkill);

  return (
    <div>
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
              <span
                className={`${
                  isOpen && task.id === currentSkill.id
                    ? 'hidden'
                    : 'min-w-16 text-center sm:text-left'
                }`}
              >
                {task.name}
              </span>
              {isOpen && task.id === currentSkill.id && (
                <BaseInput
                  handleValue={(value) => updateSkill(task.id, value)}
                  placeholder="Edit your skill"
                  customValue={task.name}
                  inputWidth="flex-1"
                />
              )}
              <div className="flex gap-2 flex-2">
                <SubmitBTN
                  label={
                    isOpen && task.id === currentSkill.id ? 'Cancel' : 'Delete'
                  }
                  handlesubmit={() => secundaryBTN(task.id)}
                  styles="bg-transparent text-black "
                />
                <SubmitBTN
                  label={
                    isOpen && task.id === currentSkill.id ? 'Save' : 'Edit'
                  }
                  handlesubmit={() => primaryBTN(task.id, task.name)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagsManager;

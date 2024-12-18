import fetch from '../utils/fetch';
import { useState, useEffect } from 'react';
import BaseInput from '../components/UI/BaseInput';
import SubmitBTN from '../components/UI/SubmitBTN';
import GeneralContainer from '../components/UI/GeneralContainer';
import { Skill } from '../utils/types';

const TagsManager = () => {
  const [skills, setSkills] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({ id: '', name: '' });
  const [addSkill, setAddSkill] = useState('');
  const [error, setError] = useState({ addSkill: '', editSkill: '' });
  const getSkills = async () => {
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
      resetEdit();
    } catch (error) {
      console.error(error);
    }
  };
  const updateSkill = async (id: string, name: string) => {
    if (currentSkill.name.trim() !== '') {
      try {
        const { data } = await fetch.patch(`/skills/${id}`, { name });
        resetEdit();
        return data;
      } catch (error) {
        console.error(error);
      }
    } else {
      setError({
        ...error,
        editSkill: 'Empty field',
      });
    }
  };
  const postSkills = async (name: string) => {
    if (addSkill.trim() !== '') {
      try {
        const { data } = await fetch.post('/skills', { name });
        resetEdit();
        return data;
      } catch (error) {
        console.error(error);
      }
    } else {
      setError({
        ...error,
        addSkill: 'Empty field',
      });
    }
  };
  const changeAddSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddSkill(e.target.value);
    setError({
      ...error,
      addSkill: '',
    });
  };
  const changeEditSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSkill({ ...currentSkill, name: e.target.value });
    setError({
      ...error,
      editSkill: '',
    });
  };
  const resetEdit = () => {
    setIsOpen(!isOpen);
    getSkills();
    setCurrentSkill({ id: '', name: '' });
    setAddSkill('');
  };
  const openEdit = (id: string, name: string) => {
    setCurrentSkill((prev) => ({ id, name }));
    setIsOpen(!isOpen);
  };
  const secundaryBTN = (id: string) => {
    isOpen ? setIsOpen(!isOpen) : deleteSkill(id);
  };
  const primaryBTN = (id: string, name: string, currentSkill: string) => {
    isOpen ? updateSkill(id, currentSkill) : openEdit(id, name);
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <GeneralContainer title="Manage your skills">
      <div className="max-w-[500px] m-auto divide-y-8 divide-transparent">
        <BaseInput
          placeholder="Add a new skill"
          handleValue={changeAddSkill}
          onKeyDown={(e) => e.key === 'Enter' && postSkills(addSkill)}
          value={addSkill}
          name="AddSkill"
          errorMessage={error.addSkill}
        />
        <ul>
          {skills.map((tag: Skill) => (
            <li
              className="border p-3 flex gap-y-5 flex-wrap justify-center sm:justify-between items-center"
              key={tag.id}
            >
              <span
                className={`${
                  isOpen && tag.id === currentSkill.id
                    ? 'hidden'
                    : 'min-w-16 text-center sm:text-left'
                }`}
              >
                {tag.name}
              </span>
              {isOpen && tag.id === currentSkill.id && (
                <BaseInput
                  handleValue={changeEditSkill}
                  placeholder="Edit your skill"
                  value={currentSkill.name}
                  inputWidth="flex-1"
                  name="EditSkill"
                  errorMessage={error.editSkill}
                />
              )}
              <div className="flex gap-2 flex-2">
                <SubmitBTN
                  label={
                    isOpen && tag.id === currentSkill.id
                      ? 'Cancel'
                      : 'Delete ...'
                  }
                  handlesubmit={() => secundaryBTN(tag.id)}
                  styles="bg-transparent text-red-500 hover:text-red-400"
                />
                <SubmitBTN
                  label={isOpen && tag.id === currentSkill.id ? 'Save' : 'Edit'}
                  styles="hover:bg-green-400"
                  handlesubmit={() =>
                    primaryBTN(tag.id, tag.name, currentSkill.name)
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </GeneralContainer>
  );
};

export default TagsManager;

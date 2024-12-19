import BaseInput from '../components/UI/BaseInput';
import Tag from '../components/UI/Tag';
import SubmitBTN from '../components/UI/SubmitBTN';
import { useState } from 'react';
import AutocompleteInput from '../components/UI/AutocompleteInput';
import GeneralContainer from '../components/UI/GeneralContainer';
const AddMember = () => {
  const [skills, setSkills] = useState<string[]>([]);
  return (
    <GeneralContainer title="Add team member">
      <div className="flex flex-col justify-between gap-y-20">
        <div>
          <span className="text-gray-800">Personal information</span>
          <p className="text-gray-400 text-xs mt-2 mb-8">
            We will send you a temporary url at your mail, so you can set your
            password and login to your dashboard.
          </p>
          <div className="flex flex-col h-60 justify-between">
            <BaseInput handleValue={console.log} placeholder="Name" />
            <BaseInput handleValue={console.log} placeholder="Lastname" />
            <BaseInput handleValue={console.log} placeholder="email" />
          </div>
        </div>
        <div>
          <span className="text-gray-800">Skills</span>
          <p className="text-gray-400 text-xs mt-2 mb-8">
            Please add all skills you can work with, i.e. JS, Node, Css.You can
            add as many as you like, just be sure you are work ready on that
            skill.
          </p>
          <AutocompleteInput
            styles="placeholder:text-[11px] xs:placeholder:text-base"
            placeholder="Add a tag and press enter"
            handleValue={(newValue: string) => {
              const value = newValue.split(/[, ]+/);
              setSkills((oldValue) => [...oldValue, ...value]);
            }}
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {skills.map((skill, index) => (
              <Tag
                key={index + skill}
                label={skill}
                handleClose={() => {
                  const value = skills.filter((item) => item !== skill);
                  setSkills((prev) => [...value]);
                }}
              />
            ))}
          </div>
        </div>
        <div className="">
          <span className="text-gray-800">Hourly rate</span>
          <p className="text-gray-400 text-xs mt-2 mb-8">
            Let us know what’s your hourly rate, we will review it, and make you
            a final proposal.If you already talked to a representative, please
            write the amount previous agreed.
          </p>
          <BaseInput
            handleValue={console.log}
            inputWidth="w-12"
            placeholder="10"
          />
        </div>
        <div className="flex justify-center xs:justify-end   flex-wrap py-5 items-center gap-y-4 md:gap-y-0 gap-x-2">
          <SubmitBTN
            label="not now ..."
            handlesubmit={() => console.log('hola')}
            styles="bg-transparent text-black "
          />
          <SubmitBTN
            label="Add menber"
            handlesubmit={() => console.log('hola')}
          />
        </div>
      </div>
    </GeneralContainer>
  );
};

export default AddMember;

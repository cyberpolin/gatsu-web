import BaseInput from '../components/UI/BaseInput';
import Tag from '../components/UI/Tag';
import SubmitBTN from '../components/UI/SubmitBTN';
const FormAddPerson = () => {
  return (
    <div className="mx-auto px-8  bg-white border border-gray-100 rounded-sm">
      <h1 className="text-xl font-medium mt-5 mb-6 ">Add team member</h1>
      <div className="flex flex-col justify-between gap-y-20 ">
        <div>
          <span className="text-gray-800">Personal information</span>
          <span className="text-gray-800">Personal information</span>
          <p className="text-gray-400 text-xs mt-2 mb-8">
            We will send you a temporary url at your mail, so you can set your
            password and login to your dashboard.
          </p>
          <div className="flex flex-col h-60 justify-between">
            <BaseInput placeholder="Name" styles="w-full" />
            <BaseInput placeholder="Lastname" />
            <BaseInput placeholder="email" />
          </div>
        </div>
        <div className="">
          <span className="text-gray-800">Skills</span>
          <p className="text-gray-400 text-xs mt-2 mb-8">
            Please add all skills you can work with, i.e. JS, Node, Css.You can
            add as many as you like, just be sure you are work ready on that
            skill.
          </p>
          <BaseInput placeholder="Add a tag and press enter" />
        </div>
        <div className="">
          <span className="text-gray-800">Hourly rate</span>
          <p className="text-gray-400 text-xs mt-2 mb-8">
            Let us know what’s your hourly rate, we will review it, and make you
            a final proposal.If you already talked to a representative, please
            write the amount previous agreed.
          </p>
          <BaseInput inputWidth="w-12" placeholder="10" />
        </div>
        <div className="flex justify-end py-5 items-center gap-x-2">
          <div> not now...</div>
          <SubmitBTN
            label="Add menber"
            handlesubmit={() => console.log('hola')}
          />
        </div>
      </div>
    </div>
  );
};

export default FormAddPerson;

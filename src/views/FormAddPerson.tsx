import BaseInput from '../components/UI/BaseInput';
import Tag from '../components/UI/Tag';
import SubmitBTN from '../components/UI/SubmitBTN';
const FormAddPerson = () => {
  return (
    <div className="flex flex-col h-[700px] justify-between">
      <div className="flex flex-col h-80 justify-between">
        <div className="h-14">
          <span className="text-gray-700 text-xl">Personal information</span>
          <p className="text-gray-400 text-sm mt-2 w-1/2">
            We will send you a temporary url at your mail, so you can set your
            password and login to your dashboard.
          </p>
        </div>
        <BaseInput placeholder="Name" styles="w-full" />
        <BaseInput placeholder="Lastname" />
        <BaseInput placeholder="email" />
      </div>
      <div className="flex flex-col h-36 justify-between">
        <div className="h-14">
          <span className="text-gray-700 text-xl">Skills</span>
          <p className="text-gray-400 text-sm mt-2 w-1/2">
            Please add all skills you can work with, i.e. JS, Node, Css.You can
            add as many as you like, just be sure you are work ready on that
            skill.
          </p>
        </div>
        <BaseInput placeholder="Add a tag and press enter" />
      </div>
      <div className="flex flex-col h-36 justify-between">
        <div className="h-14">
          <span className="text-gray-700 text-xl">Hourly rate</span>
          <p className="text-gray-400 text-sm mt-2 w-1/2">
            Let us know what’s your hourly rate, we will review it, and make you
            a final proposal.If you already talked to a representative, please
            write the amount previous agreed.
          </p>
        </div>
        <BaseInput placeholder="10" />
      </div>
      <div className="flex justify-end">
        <div> not now...</div>
        <SubmitBTN text="Add menber" handlesubmit={() => console.log('hola')} />
      </div>
    </div>
  );
};

export default FormAddPerson;

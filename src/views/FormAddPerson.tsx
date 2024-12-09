import InputIcon from '../components/UI/InputIcon';
import Tag from '../components/UI/Tag';
import SubmitBTN from '../components/UI/SubmitBTN';
const FormAddPerson = () => {
  return (
    <div>
      <div>
        <span>Personal information</span>
        <p>
          We will send you a temporary url at your mail, so you can set your
          password and login to your dashboard.
        </p>
        <InputIcon placeholder="Name" />
        <InputIcon placeholder="Lastname" />
        <InputIcon placeholder="email" />
      </div>
      <div>
        <span>Skills</span>
        <p>
          Please add all skills you can work with, i.e. JS, Node, Css.You can
          add as many as you like, just be sure you are work ready on that
          skill.
        </p>
        <InputIcon placeholder="Add a tag and press enter" />
      </div>
      <div>
        <span>Hourly rate</span>
        <p>
          Let us know what’s your hourly rate, we will review it, and make you a
          final proposal.If you already talked to a representative, please write
          the amount previous agreed.
        </p>
        <InputIcon placeholder="10" />
      </div>
      <div>
        <div> not now...</div>
        <SubmitBTN text="Add menber" handlesubmit={() => console.log('hola')} />
      </div>
    </div>
  );
};

export default FormAddPerson;

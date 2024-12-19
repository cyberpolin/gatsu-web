import GeneralContainer from '../components/UI/GeneralContainer';
import BaseInput from '../components/UI/BaseInput';
import SubmitBTN from '../components/UI/SubmitBTN';
import fetch from '../utils/fetch';
const AddClients = () => {
  const SubmitClients = async () => {
    try {
      const { data } = await fetch.post('/clients', {
        name: '',
        email: '',
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <GeneralContainer title="Add Clients">
      <BaseInput placeholder="Clients Name" handleValue={console.log} />
      <BaseInput placeholder="Clients email" handleValue={console.log} />
      <SubmitBTN label="Save" handlesubmit={SubmitClients}></SubmitBTN>
    </GeneralContainer>
  );
};

export default AddClients;

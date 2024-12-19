import fetch from '../utils/fetch';
import { useEffect, useState } from 'react';
import { GetMember } from '../utils/types';
import GeneralContainer from '../components/UI/GeneralContainer';

const TeamTable = () => {
  const [member, setMember] = useState<GetMember[]>([]);
  const getSkills = async () => {
    try {
      const { data } = await fetch.get('/developers');
      setMember(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSkills();
  }, []);
  return (
    <GeneralContainer title="Team">
      <div className="overflow-x-scroll">
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 w-14">
                Score
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 min-w-40">
                Name
              </th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">
                Skills
              </th>
              <th className="py-2 pr-4 pl-20 text-left text-sm font-medium text-gray-600 w-10">
                Internal Price
              </th>
            </tr>
          </thead>
          <tbody>
            {member.map(({ id, name, skills, rate }) => (
              <tr key={id} className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4 text-sm text-gray-700 text-right">
                  {234}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">{name}</td>
                <td className="py-2 px-4 text-sm text-gray-700 truncate max-w-[150px] md:max-w-[10px]">
                  {skills.map((skill) => skill.name).join(', ')}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700 text-right">
                  {rate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GeneralContainer>
  );
};
export default TeamTable;

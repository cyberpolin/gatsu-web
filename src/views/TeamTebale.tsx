import InfiniteScroll from '../components/InfiniteScroll';

const TeamTable = () => {
  const data = [
    {
      id: 1,
      name: 'John',
      score: 5,
      skills: ['Frontend Developer', 'React', 'Angular'],
      hourRate: 25,
    },
    {
      id: 2,
      name: 'Jane',
      score: 4,
      skills: ['Backend Developer', 'NodeJS', 'Express'],
      hourRate: 30,
    },
    {
      id: 3,
      name: 'Doe',
      score: 3,
      skills: ['Fullstack Developer', 'React', 'NodeJS'],
      hourRate: 35,
    },
    {
      id: 4,
      name: 'Smith',
      score: 2,
      skills: ['Fullstack Developer', 'Angular', 'Express'],
      hourRate: 40,
    },
  ];

  return (
    <div className="container mx-auto p-4 bg-white border border-gray-200 border-1 rounded-sm">
      <div className=" flex flex-wrap  sm:justify-between   gap-y-3 sm:gap-0 ">
        <span className="text-black font-extrabold ">Team</span>
      </div>
      <InfiniteScroll loading dataLegth={data.length}>
        <div className=" mt-10 overflow-x-scroll">
          <table className="min-w-full ">
            <thead>
              <tr className="border-b-2 border-gray-300 ">
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
              {data.map((person) => (
                <tr key={person.id} className="even:bg-gray-100 odd:bg-white">
                  <td className="py-2 px-4 text-sm text-gray-700 text-right">
                    {person.score}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {person.name}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700  truncate max-w-[150px] md:max-w-[10px]">
                    {person.skills}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700 text-right">
                    {person.hourRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
    </div>
  );
};
export default TeamTable;

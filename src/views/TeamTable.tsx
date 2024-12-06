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
      skills: ['node'],
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
      <div className=" flex flex-wrap sm:justify-between pb-8 md:pb-14 gap-y-3 sm:gap-0 ">
        <span className="text-black font-extrabold ">Team</span>
      </div>

      <div className="min-w-full">
        <InfiniteScroll dataLegth={data.length} loading={false}>
          <div className="w-full flex">
            <div className="bg-slate-500 w-1/12">12</div>
            <div className="bg-red-500 w-5/12">12</div>
            <div className="bg-blue-500 w-5/12">12</div>
            <div className="bg-green-500 w-1/12">12</div>
          </div>
          <table className=" w-full  ">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 w-1/12">
                  Score
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 w-5/12">
                  Name
                </th>
                <th className="py-2 px-4 text-sm font-medium text-gray-600 w-5/12">
                  Skills
                </th>
                <th className="py-2 pr-4 pl-20 text-left text-sm font-medium text-gray-600 w-1/12">
                  Internal Price
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, score, name, skills, hourRate }) => (
                <tr
                  key={id}
                  className="even:bg-gray-100 odd:bg-white min-w-full flex-col"
                >
                  <td className="py-2 px-4 text-sm text-gray-700 text-right border border-red-300 w-1/12">
                    {score}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700 w-5/12">
                    {name}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700 truncate w-5/12">
                    {skills}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700 text-right border border-red-400 w-1/12">
                    {hourRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
        <div className="w-full flex">
          <div className="bg-slate-500 w-1/12">12</div>
          <div className="bg-red-500 w-5/12">12</div>
          <div className="bg-blue-500 w-5/12">12</div>
          <div className="bg-green-500 w-1/12">12</div>
        </div>
      </div>
    </div>
  );
};
export default TeamTable;

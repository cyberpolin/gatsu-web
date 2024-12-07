import { SyntheticEvent, useState, } from 'react'
import SkeletonRow from '../components/SketelonRow';
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
]

const TeamTable = () => {
  const [items, setItems] = useState(data)
  const [loading, setLoading] = useState(false)
  const [ood, setOdd] = useState(items.length % 2)


  const loadMoreItems = () => {
    setLoading(true)
    console.log('loading', loading)
    setTimeout(() => {
      const nextItems = data.slice(items.length, items.length + 2)
      setItems((prevItems) => [...prevItems, ...nextItems])
      setOdd(items.length % 2)
      setLoading(false)
      console.log('loading', loading)
    }, 2000)
  }

  const handleScroll = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom) {
      loadMoreItems()
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white border border-gray-200 border-1 rounded-sm">
      <div className="flex flex-wrap sm:justify-between pb-8 md:pb-14 gap-y-3 sm:gap-0">
        <span className="text-black font-extrabold">Team</span>
      </div>
      <div className=' h-[100px] overflow-x-auto' onScroll={handleScroll}>
        <table className="min-w-full table-fixed">
          <thead className="">
            <tr className='border-b-2 border-gray-300'>
              <th className="py-2 px-4 w-1/12 text-left">Score</th>
              <th className="py-2 px-4 w-5/12 text-left">Name</th>
              <th className="py-2 px-4 w-5/12 text-left">Skills</th>
              <th className="py-2 px-4 w-1/12 text-left">Hour Rate</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ id, score, name, skills, hourRate }) => (
              <tr key={id} className="odd:bg-white even:bg-gray-100">
                <td className="py-2 px-4 text-right">{score}</td>
                <td className="py-2 px-4">{name}</td>
                <td className="py-2 px-4 truncate">
                  {skills.join(', ')}
                </td>
                <td className="py-2 px-4 text-right">${hourRate}</td>
              </tr>
            ))}
            {loading && (
              <>
                <SkeletonRow elementLength={items.length} />
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;

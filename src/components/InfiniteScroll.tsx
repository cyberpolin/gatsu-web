import React, { SyntheticEvent, ReactNode } from 'react';

const SkeletonRow = ({ tableCount }: { tableCount: number }) => {
  const template = [1, 2, 3, 4, 5];
  const evenClass = tableCount % 2 === 0 ? 'bg-white' : 'bg-gray-300';
  const oddClass = tableCount % 2 !== 0 ? 'bg-white' : 'bg-gray-300';
  return (
    <table className="min-w-full">
      <tbody>
        {template.map((_, index) => {
          const bgPulse =
            (tableCount + index) % 2 === 0 ? 'bg-white' : 'bg-gray-300';
          return (
            <tr key={index} className={`even:${evenClass} odd:${oddClass}`}>
              <td className="py-2 pl-3 ">
                <div
                  className={`${bgPulse} h-4 rounded w-12 animate-pulse "`}
                ></div>
              </td>
              <td className="py-2 pr-3 flex justify-start">
                <div
                  className={`${bgPulse} h-4 rounded w-24 animate-pulse`}
                ></div>
              </td>
              <td className="py-2 px-4 ">
                <div
                  className={`${bgPulse} h-4 rounded w-36 ml-14 animate-pulse`}
                ></div>
              </td>
              <td className="py-2 px-3  flex justify-end">
                <div
                  className={` ${bgPulse} h-4 rounded w-12 animate-pulse`}
                ></div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

interface Person {
  id: number;
  name: string;
  skills: string;
  score: number;
  hourRate: string;
}
interface InfiniteScroll {
  children: ReactNode;
  loading: boolean;
  dataLegth: number;
}

const InfiniteScroll: React.FC<InfiniteScroll> = ({
  children,
  loading,
  dataLegth,
}) => {
  const handleScroll = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom) {
      // loadMoreData();
      console.log('inside loadmore data');
    }
  };

  return (
    <div className=" overflow-auto max-h-96" onScroll={handleScroll}>
      {children}
      <SkeletonRow tableCount={dataLegth + 1} />
      {loading && <div className="text-center py-4">{/* skeleton */}</div>}
    </div>
  );
};

export default InfiniteScroll;

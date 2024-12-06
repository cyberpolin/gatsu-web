import React, { SyntheticEvent, ReactNode } from 'react';

const SkeletonRow = ({ tableCount }: { tableCount: number }) => {
  const template = [1, 2];
  return (
    <table className="min-w-[651.36px] w-full">
      <tbody>
        {template.map((_, index) => {
          const bgPulse =
            (tableCount + index) % 2 === 0 ? 'bg-white' : 'bg-gray-300';
          const bgTr =
            (tableCount + index) % 2 !== 0 ? 'bg-white' : 'bg-gray-300';
          return (
            <tr key={index} className={`${bgTr} flex `}>
              <td className="py-2 px-4  border-red-200 border w-1/12">
                <div
                  className={`${bgPulse} h-4 rounded w-10 animate-pulse `}
                ></div>
              </td>
              <td className="py-2 pr-4  border border-green-200 w-5/12">
                <div className={`${bgPulse} h-4 rounded animate-pulse `}></div>
              </td>
              <td className="py-2 px-4  border-red-500 border w-5/12">
                <div
                  className={`${bgPulse} h-4 rounded w-60 animate-pulse`}
                ></div>
              </td>
              <td className="py-2 px-4  border border-yellow-300 w-1/12">
                <div className={`${bgPulse} h-4 rounded animate-puls`}></div>
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
    }
  };

  return (
    <div className="overflow-auto max-h-96 " onScroll={handleScroll}>
      {children}

      <SkeletonRow tableCount={dataLegth + 1} />
      {loading && <SkeletonRow tableCount={dataLegth + 1} />}
    </div>
  );
};

export default InfiniteScroll;

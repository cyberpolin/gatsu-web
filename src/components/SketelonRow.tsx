const SkeletonRow = ({ elementLength }: { elementLength: number }) => {
  const template = [1, 2, 3, 4, 5];

  return (
    <>
      {template.map((_, index) => {
        const bgPulse =
          (elementLength + index) % 2 === 0 ? 'bg-white' : 'bg-gray-300';
        const bgTr =
          (elementLength + index) % 2 !== 0 ? 'bg-white' : 'bg-gray-300';
        return (
          <tr key={index} className={`${bgTr}`}>
            <td className="py-2 px-4 w-1/12">
              <div className={`h-4 w-6 rounded animate-pulse ml-auto ${bgPulse}`}></div>
            </td>
            <td className="py-2 px-4 w-5/12">
              <div className={`h-4 w-3/4 rounded animate-pulse ${bgPulse}`}></div>
            </td>
            <td className="py-2 px-4 w-5/12">
              <div className={`h-4 w-full rounded animate-pulse ${bgPulse}`}></div>
            </td>
            <td className="py-2 px-4 w-1/12">
              <div className={`h-4 w-8 rounded animate-pulse ml-auto ${bgPulse}`}></div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default SkeletonRow;

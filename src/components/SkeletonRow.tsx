import { twMerge } from 'tailwind-merge';

type content = {
  td: string;
  skeleton: string;
};

const SkeletonRow = ({
  elementLength,
  content,
}: {
  elementLength: number;
  content: content[];
}) => {
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
            {content.map((styles, index) => {
              return (
                <td key={index} className={`py-2 px-4 ${styles.td}`}>
                  <div
                    className={`h-4 rounded animate-pulse ${bgPulse} ${styles.skeleton}`}
                  ></div>
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

export default SkeletonRow;

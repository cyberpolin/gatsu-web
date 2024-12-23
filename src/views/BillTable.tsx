import GeneralContainer from '../components/UI/GeneralContainer';
import type { Concept } from '../utils/types';
import currency from 'currency.js';
import SkeletonRow from '../components/SkeletonRow';
import { useState } from 'react';
const BillTable = () => {
  const [loading, setLoading] = useState(false);
  const data = {
    from: {
      name: 'John Doe',
      address: '1234 Elm St, Springfield, IL, 62701',
      phone: '+1 (555) 123-4567',
      email: 'johndoe@example.com',
    },
    to: {
      name: 'Jane Smith',
      address: '5678 Oak St, Chicago, IL, 60601',
      phone: '+1 (555) 987-6543',
      email: 'janesmith@example.com',
    },
    concepts: [
      {
        qty: '2',
        concept: 'Laptop',
        unitPrice: '1200',
        amount: '2400',
      },
      {
        qty: '1',
        concept: 'Wireless Mouse',
        unitPrice: '25',
        amount: '25',
      },
      {
        qty: '3',
        concept: 'USB-C Cable',
        unitPrice: '10.00',
        amount: '30',
      },
    ],
  };

  const SubTitle = () => {
    return (
      <span className="flex items-baseline">
        <span className="text-gray-400 text-sm mr-4">Due date</span>
        <h3 className="text-black">NOV 23, 2024</h3>
      </span>
    );
  };

  const { from, to, concepts } = data;
  const sumTotal = concepts.reduce(
    (acc: number, concept: Concept) => acc + Number(concept.amount),
    0,
  );
  const subTotal = currency(sumTotal).format({ symbol: '' });
  const vat = currency(sumTotal * 0.15).format({ symbol: '' }); // raw vat
  const Total = currency(Number(sumTotal) + Number(vat)).format();

  return (
    <GeneralContainer title="invoice # 124" subTitle={SubTitle}>
      <div className=" flex flex-wrap justify-center aling md:justify-between  divide-transparent gap-y-3 sm:gap-0">
        <div className="px-5 md:px-0 mb-4 md:mb-0">
          <label className="text-gray-400 text-xs block">from:</label>
          <span className="text-black font-extrabold block mb-3">
            {from.name}
          </span>
          <span className="block mb-3">{from.address}</span>
          <div>
            <label className="text-gray-400 text-xs">Phone: </label>
            <span className="">{from.phone}</span>
          </div>
          <label className="text-gray-400 text-xs ">Email: </label>
          <span>{from.email}</span>
        </div>
        <div className="px-5 md:px-0 relative">
          <span className="absolute right-4 -top-1 ">
            <label className="text-gray-400 text-xs block">to:</label>
            <span className="text-black font-extrabold block ">{to.name}</span>
          </span>
          <span className="block text-right mt-[51px] mb-3">{to.address}</span>
          <div className="text-right">
            <label className="text-gray-400 text-xs">Phone: </label>
            <span className="">{to.phone}</span>
          </div>
          <div className="text-right">
            <label className="text-gray-400 text-xs">Email: </label>
            <span>{to.email}</span>
          </div>
        </div>
      </div>
      <div className=" mt-10 overflow-x-scroll">
        <table className="min-w-full ">
          <thead>
            <tr className=" border-b-2 border-gray-300 ">
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 w-14 ">
                QTY.
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                Concept
              </th>
              <th className="py-2 px-4  text-sm font-medium text-gray-600 w-28">
                Unit Price
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium text-gray-600 w-10">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {concepts.map((concept, index) => (
              <tr key={index} className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4 text-sm text-gray-700 text-right">
                  {concept.qty}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {concept.concept}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700 text-right">
                  {currency(concept.unitPrice).format({ symbol: '' })}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700 text-right ">
                  {currency(concept.amount).format({ symbol: '' })}
                </td>
              </tr>
            ))}
            {false && (
              <>
                <SkeletonRow
                  elementLength={concepts.length}
                  content={[
                    { td: 'w-1/12', skeleton: 'w-6 ml-auto' },
                    { td: 'w-5/12', skeleton: 'w-3/4' },
                    { td: 'w-5/12', skeleton: 'w-3/4 ml-auto' },
                    { td: 'w-1/12', skeleton: 'w-15 ml-auto' },
                  ]}
                />
              </>
            )}
          </tbody>
          <tfoot className="">
            <tr>
              <td
                colSpan={3}
                className="py-2 px-4 text-right font-semibold text-sm text-gray-600"
              >
                Subtotal
              </td>
              <td className="py-2 px-4 text-sm text-gray-700 text-right">
                {subTotal}
              </td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="py-2 px-4 text-right font-semibold text-sm text-gray-600"
              >
                Vat
              </td>
              <td className="py-2 px-4 text-sm text-gray-700 text-right">
                {vat}
              </td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="py-2 px-4 text-right font-semibold text-sm text-black-600"
              >
                Total
              </td>
              <td className="py-2 px-4 text-sm text-gray-700 text-right">
                {Total}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </GeneralContainer>
  );
};
export default BillTable;

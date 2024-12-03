import moment from 'moment';
import useEntries from '../../utils/hooks/UseEntries';
import _, { get } from 'lodash';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import ProcessTable from '../ProcessTable';

const AdminDashboard = () => {
  const { entries, getEntries } = useEntries();
  const [selection, setSelection] = useState('week');
  const getWeekRange = (date: Date) => {
    const week = moment(date).week();
    const weekStart = moment().week(week).startOf('week').format('MMM DD');
    const weekEnd = moment().week(week).endOf('week').format('MMM DD');
    return `${weekStart} - ${weekEnd}`;
  };

  const entriesByWeek = _.groupBy(entries, (entry: { date: Date }) =>
    getWeekRange(entry.date),
  );

  const entriesBy15Days = _.groupBy(
    entries,
    (entry: { date: moment.MomentInput }) => {
      const day = moment(entry.date).date();
      const lastDay = moment(entry.date).endOf('month').format('DD');
      if (day <= 15) {
        return `${moment(entry.date).format('MMM')} 01 - 15`;
      } else {
        return `${moment(entry.date).format('MMM')} 16 - ${lastDay}`;
      }
    },
  );

  const selectedEntry = selection === 'week' ? entriesByWeek : entriesBy15Days;

  const [onlyPending, setOnlyPending] = useState(false);

  return (
    <div>
      <h1 className="text-xl font-medium mt-5 mb-8 ">
        Welcome Carlos, these are your entries
      </h1>

      <span className="w-full flex text-xs text-slate-400 justify-end">
        <Link
          onClick={() => setSelection('week')}
          className="underline mx-2 hover:text-slate-600"
          to={'#'}
        >
          Weekly
        </Link>
        <Link
          onClick={() => setSelection('15days')}
          className="underline mx-2 hover:text-slate-600"
          to={'#'}
        >
          every 15 days
        </Link>
        <div className="border ml-4 mx-2 border-slate-300 rounded-sm aspect-square h-4 items-center justify-center flex ">
          <div
            onClick={() => setOnlyPending(!onlyPending)}
            className={`aspect-square h-3 transition-all ${onlyPending ? 'bg-slate-300' : 'bg-slate-100'
              }  rounded-sm`}
          ></div>
        </div>
        <span>Show only pending</span>
      </span>
      {Object.keys(selectedEntry).map((date) => {
        const title = date;
        const weekEntries = selectedEntry[date];
        const orderByDay = _.groupBy(weekEntries, (entry: { date: Date }) => {
          return moment(entry.date).format('ddd, MMM DD');
        });
        const orderByDayKeys = Object.keys(orderByDay);
        return (
          <>
            <span className="w-full flex text-xs text-slate-400 ">{title}</span>
            {orderByDayKeys.map(
              //@ts-ignore
              (key) => {
                const data = orderByDay[key];
                const totalHours = data.reduce(
                  //@ts-ignore
                  (acc: number, { hours }: any) => {
                    return acc + hours;
                  },
                  0,
                );
                return (
                  <div key={key} className="mt-2 mb-6">
                    <div className="border bg-slate-200 border-slate-400 px-4 py-6 flex justify-between items-baseline  ">
                      <p className="text-xs text-slate-400">{key}</p>
                      <div className="w-1/2 flex justify-end ">
                        <p className="text-xs text-slate-400">Total:</p>
                        <p className="text-xs text-slate-800 font-semibold">
                          {totalHours}
                        </p>
                      </div>
                    </div>
                    {
                      //@ts-ignore
                      data.map(({ id, hours, task, project }: any) => {
                        return (
                          <div key={id}>
                            <div className=" border border-t-0 bg-slate-50 border-slate-400 p-4 py-4 flex justify-between items-baseline ">
                              <div className="w-1/4">
                                <p className="text-xs text-slate-400">{task}</p>
                              </div>
                              <div className="w-1/2">
                                <p className="text-xs text-slate-400 font-semibold">
                                  {project.name || 'No project'}
                                </p>
                              </div>
                              <div className="w-1/4 justify-end flex">
                                <p className="text-xs text-slate-400">
                                  hours:
                                  <span className="text-lg text-slate-600 font-bold">
                                    {hours}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                );
              },
            )}
          </>
        );
      })}
    </div>
  );
};

export default AdminDashboard;

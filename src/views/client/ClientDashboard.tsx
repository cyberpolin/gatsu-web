import 'chart.js/auto';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import useEntries from '../../utils/hooks/UseEntries';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import PickDate from '../../components/PickDate';
import moment from 'moment';
import { ChevronDown } from 'react-ionicons';
import Loading from '../../components/UI/Loading';

const pastMonday = moment().startOf('isoWeek');
const pastTwoWeeks = moment().subtract(1, 'weeks').startOf('isoWeek');
const startOfMonth = moment().startOf('month');
const endOfMonth = moment().endOf('month');
const today = new Date();

const selector: { [key: string]: { from: Date; to: Date } } = {
  'This week': {
    from: pastMonday.toDate(),
    to: today,
  },
  'Last week': {
    from: pastTwoWeeks.toDate(),
    to: moment().subtract(1, 'week').endOf('week').toDate(),
  },
  'Last 2 weeks': {
    from: pastTwoWeeks.toDate(),
    to: new Date(),
  },
  'Last month': {
    from: startOfMonth.subtract(1, 'month').toDate(),
    to: endOfMonth.subtract(1, 'month').toDate(),
  },
};

function ClientDashboard() {
  const navigate = useNavigate();
  const { hours, projectsTasks, getEntriesHours, getProjectsTasks, isLoading } =
    useEntries();
  const [fromHour, setFromHour] = useState(selector['This week'].from);
  const [toHour, setToHour] = useState(selector['This week'].to);
  const [selectedValue, setSelectedValue] = useState<keyof typeof selector>();

  //TODO: move this to a component
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const toggleProject = (id: string) => {
    if (selectedProject === id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(id);
    }
  };

  const clearSelectoValue = () => {
    setSelectedValue('');
  };

  useEffect(() => {
    //TODO: ensure this get fired only if both dates change
    if (fromHour && toHour) {
      getEntriesHours({ from: fromHour, to: toHour });
    }
  }, [fromHour, toHour]);

  return (
    <div
      className="
    flex
    flex-col
    items-center
    justify-start
    min-h-screen
    bg-gray-100
    p-4
    "
    >
      {isLoading && <Loading />}
      {/* Top navigation like mobile with back button */}
      <div
        className="
        w-full
        flex
        items-center
        justify-between
        border-b
        "
      >
        <a onClick={() => navigate(-1)} href="#">
          Back
        </a>
        <Link to="./orders/new">New Order</Link>
      </div>

      <div className="grid grid-cols-3 grid-flow-col gap-4 w-full">
        <div className="border rounded-md p-2 bg-white">
          <span className="text-sm text-slate-400 ">Paid</span>
          <h4 className="text-3xl">
            20:00<span className="text-sm">hr</span>
          </h4>
        </div>
        <div className="border rounded-md p-2 bg-white">
          <span className="text-sm text-slate-400 ">Due</span>
          <h4 className="text-3xl">
            20:00<span className="text-sm">hr</span>
          </h4>
        </div>
        <div className="border rounded-md p-2 bg-white">
          <span className="text-sm text-slate-400 ">Total hours</span>
          <h4 className="text-3xl">
            20:00<span className="text-sm">hr</span>
          </h4>
        </div>
      </div>

      <div className="border w-full rounded-md p-10 mt-6 bg-slate-50 ">
        <div className="w-full">
          <span className="text-sm w-full text-slate-400 p-2 ">
            Choose a time span
          </span>
        </div>

        <div className="w-full flex flex-row">
          <div className=" w-full flex">
            <div className="border bg-white w-1/2 flex flex-col rounded-md p-2 m-2">
              <PickDate
                onDateSelected={(e) => {
                  setFromHour(e);
                  clearSelectoValue();
                }}
                selectedDate={fromHour}
                key="1"
              />
            </div>
            <div className="border bg-white w-1/2 flex flex-col rounded-md p-2 m-2">
              <PickDate
                onDateSelected={(e) => {
                  setToHour(e);
                  clearSelectoValue();
                }}
                selectedDate={toHour}
                key="1"
              />
            </div>
          </div>

          <>
            <select
              onChange={(e) => {
                if (!e.target.value) return;
                setFromHour(
                  selector[e.target.value as keyof typeof selector].from,
                );
                setToHour(selector[e.target.value].to);
                setSelectedValue(e.target.value);
              }}
              defaultValue={'This week'}
              value={selectedValue}
              className="border rounded-md p-2 m-2"
            >
              {' '}
              <option value="">Select a range</option>
              {Object.keys(selector).map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </select>
          </>
        </div>

        <div className="md:flex w-full ">
          <div className="p-2 md:w-2/3">
            <h2 className=" font-light border-slate-600 bg-slate-300 border p-2 text-slate-600 ">
              Hours by project
            </h2>
            <ul className="border h-full">
              {hours.map(({ name, hours, id }) => (
                <>
                  <li
                    key={id}
                    className="flex items-center justify-between border-b my-4 mx-2 p-2"
                  >
                    <div
                      onClick={() => {
                        getProjectsTasks({ id, from: fromHour, to: toHour });
                        toggleProject(id);
                      }}
                      className={`cursor-pointer border border-transparent hover:border-slate-400 hover:bg-slate-100 rounded-md transition-all
                      ${selectedProject === id && 'rotate-180'}  `}
                    >
                      <ChevronDown />
                    </div>
                    <p>{name}</p>
                    <p>{hours}</p>
                  </li>
                  <div
                    className={`${
                      selectedProject === id ? 'h-auto' : 'h-0'
                    } transition-all border overflow-hidden `}
                  >
                    <ul>
                      {projectsTasks.map(({ task, hours, date }) => (
                        <li className="flex justify-between p-4 border-b ">
                          <div className="w-full flex items-baseline ">
                            <div className="w-3/5">
                              <p>{task}</p>
                            </div>
                            <div className="w-2/5 text-right mr-4 ">
                              <p>{hours}</p>
                            </div>

                            <div className="text-center">
                              <div className="border-2 border-green-500 rounded-t-md px-2 border-b-0 ">
                                <p className="text-green-500 font-bold">
                                  {moment(date).format('DD')}
                                </p>
                              </div>
                              <div className="border-2 border-green-500 rounded-b-md px-2 ">
                                <p className="text-green-500 font-bold">
                                  {moment(date).format('MMM')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ))}
            </ul>
          </div>{' '}
          <div className=" p-2 md:w-1/3">
            <h2 className=" font-light border-slate-600 bg-slate-300 border p-2 text-slate-600 ">
              This week
            </h2>
            <div className="border h-full">
              <Doughnut
                data={{
                  labels: hours.map((hour) => hour.name),
                  datasets: [
                    {
                      label: 'This week hours',
                      data: hours.map((hour) => hour.hours),
                      backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;

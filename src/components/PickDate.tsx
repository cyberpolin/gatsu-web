import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { set } from 'react-datepicker/dist/date_utils';
import { CalendarOutline } from 'react-ionicons';

const PickDate = ({
  onDateSelected,
  selectedDate,
}: {
  onDateSelected: (date: Date) => void;
  selectedDate: Date | null;
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <span
      onClick={() => {
        setShowCalendar(!showCalendar);
      }}
      className="flex items-center space-x-2 cursor-pointer"
    >
      <CalendarOutline />
      <DatePicker
        selected={startDate}
        onChange={(e) => {
          console.log('date', e);
          e && onDateSelected(e);
          setShowCalendar(false);
        }}
        onClickOutside={() => setShowCalendar(false)}
        inline
        calendarClassName={`!fixed ${
          showCalendar ? 'opacity-100' : 'opacity-0 -z-10 '
        } `}
      />
      {selectedDate ? (
        <span
          className={`text-green-500 underline text-sm transition-opacity `}
        >
          {selectedDate.toDateString()}
        </span>
      ) : (
        <span
          className={`text-green-500 underline text-sm transition-opacity `}
        >
          Today
        </span>
      )}
    </span>
  );
};

export default PickDate;

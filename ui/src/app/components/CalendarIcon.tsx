const CalendarIcon = ({ date }: { date: string }) => {
  const [month, day] = date.trim().split(" ");

  return (
    <div className="w-24 my-5">
      <div className="h-8 bg-rose-700 text-sky-100 rounded-t-md flex items-center justify-center">
        {month}
      </div>
      <div className="h-12 text-3xl bg-sky-100/80 text-black rounded-b-md flex items-center justify-center">
        {day}
      </div>
    </div>
  );
};

export default CalendarIcon;

import { daysOfWeek } from "@/app/lib/sport-options";
import FilterInput from "../components/FilterInput";

const SearchBarSkeleton = () => {
  return (
    <div
      className="
      flex flex-col justify-evenly items-center gap-y-5
      md:flex-row md:self-center md:gap-10 md:items-baseline
      "
    >
      <FilterInput inputType={"date"} val={""} />

      <FilterInput inputType={"select"} val={""} options={daysOfWeek} />

      <button
        type="button"
        className="
        px-6 py-3
        bg-linear-to-tr from-amber-200/20 from-0% via-amber-300/60 via-50% to-amber-200/20 to-100%
        rounded-lg
        text-amber-100 font-bold
        shadow-md shadow-amber-200 
        inset-shadow-sm inset-shadow-amber-100 
        hover:bg-amber-800"
      >
        Reset
      </button>
    </div>
  );
};

export default SearchBarSkeleton;

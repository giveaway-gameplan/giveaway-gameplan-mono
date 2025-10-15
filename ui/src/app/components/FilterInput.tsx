"use client";

const FilterInput = ({
  inputType,
  handleChange,
  options,
  val,
  label,
}: {
  inputType: string;
  handleChange?: (
    selection: string,
    keyToUpdate: "date" | "dow" | "month"
  ) => void;
  options?: string[];
  val: string;
  label?: string;
}) => {
  const baseStyles = `
  min-w-70
  text-amber-100 font-bold
  px-6 py-3 rounded-lg
  shadow-sm shadow-amber-200
  inset-shadow-sm inset-shadow-amber-200
  bg-linear-to-tr from-amber-200/50 from-0% via-amber-500/40 via-50% to-amber-200/50 to-100%
  `;

  const selectStyles = `${baseStyles} appearance-none pr-10`;

  if (inputType === "date") {
    return (
      <input
        value={val}
        type="date"
        className={baseStyles}
        onChange={(e) => {
          if (handleChange) handleChange(e.target.value, "date");
        }}
      />
    );
  } else if (inputType === "select") {
    return (
      <div className="relative inline-block">
        <select
          value={val}
          className={`${selectStyles} [appearance:none] [-webkit-appearance:none] bg-clip-padding`}
          onChange={(e) => {
            const keyToUpdate = label === "Month" ? "month" : "dow";
            if (handleChange) handleChange(e.target.value, keyToUpdate);
          }}
        >
          <option value="">{label}</option>
          {options?.map((option) => (
            <option
              key={option}
              value={
                label === "Month"
                  ? (options.indexOf(option) + 1).toString()
                  : option
              }
            >
              {option.toUpperCase()}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 text-amber-100/80"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    );
  }
};

export default FilterInput;

"use client";

const FilterInput = ({
  inputType,
  handleChange,
  options,
  val,
}: {
  inputType: string;
  handleChange?: (
    selection: string,
    keyToUpdate: "date" | "dow",
    keyToClear: "date" | "dow"
  ) => void;
  options?: string[];
  val: string;
}) => {
  const styles = `
  text-amber-100 font-bold
  px-6 py-3 rounded-lg
  shadow-md shadow-amber-200
  inset-shadow-sm inset-shadow-amber-200
  bg-linear-to-tr from-amber-200/50 from-0% via-amber-500/40 via-50% to-amber-200/50 to-100%
  `;

  if (inputType === "date") {
    return (
      <input
        value={val}
        type="date"
        className={styles}
        onChange={(e) => {
          if (handleChange) handleChange(e.target.value, "date", "dow");
        }}
      />
    );
  } else if (inputType === "select") {
    return (
      <select
        value={val}
        className={styles}
        onChange={(e) => {
          if (handleChange) handleChange(e.target.value, "dow", "date");
        }}
      >
        <option value="">Day of the week</option>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    );
  }
};

export default FilterInput;

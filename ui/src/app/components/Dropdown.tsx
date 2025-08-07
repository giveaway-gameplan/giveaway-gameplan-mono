"use client";

import DropdownOption from "./DropdownOption";
import { useState } from "react";

const Dropdown = ({
  selection,
  options,
  selectionType,
  stateSetter,
}: {
  selection: string;
  options: string[] | null;
  selectionType: string;
  stateSetter: (param: string) => void;
}) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div className="flex flex-col z-10 w-max">
      <button
        className="px-6 py-3 rounded-lg
        shadow-md shadow-amber-200
        inset-shadow-sm inset-shadow-amber-200
        bg-linear-to-tr from-amber-200/20 from-0% via-zinc-900/5 via-50% to-amber-200/20 to-100%
        hover:text-amber-400"
        onClick={() => setHidden(!hidden)}
      >
        {selection ? selection : `Select a ${selectionType}`}
      </button>
      {options &&
        options.map((option) => (
          <DropdownOption
            option={option}
            key={option}
            hidden={hidden}
            handleNav={() => {
              setHidden(true);
              stateSetter(option);
            }}
          />
        ))}
    </div>
  );
};

export default Dropdown;

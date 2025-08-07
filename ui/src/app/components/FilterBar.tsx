"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Form from "next/form";

import FilterInput from "./FilterInput";
import { daysOfWeek } from "@/app/lib/sport-options";

const FilterBar = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const date = searchParams.get("date");
  const dow = searchParams.get("dow");

  const handleFilterInputChange = (
    selection: string,
    keyToUpdate: "date" | "dow",
    keyToClear: "date" | "dow"
  ) => {
    const params = new URLSearchParams(searchParams);
    if (selection) {
      params.set(keyToUpdate, selection);
      params.delete(keyToClear);
    } else {
      params.delete(keyToUpdate);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Form
      action=""
      className="
      flex flex-col justify-evenly items-center gap-y-5
      md:flex-row md:self-center md:gap-10 md:items-baseline
      "
    >
      <FilterInput
        inputType={"date"}
        handleChange={handleFilterInputChange}
        val={date ?? ""}
      />

      <FilterInput
        inputType={"select"}
        handleChange={handleFilterInputChange}
        options={daysOfWeek}
        val={dow ?? ""}
      />
    </Form>
  );
};

export default FilterBar;

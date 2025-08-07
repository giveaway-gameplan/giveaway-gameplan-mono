const DropdownOption = ({
  option,
  hidden,
  handleNav,
}: {
  option: string;
  hidden: boolean;
  handleNav: () => void;
}) => {
  return (
    <div
      className={`
        px-6 py-3 my-1 rounded-lg 
        shadow-md shadow-amber-200 
        inset-shadow-sm inset-shadow-amber-200
        bg-linear-to-tr from-amber-200/20 from-0% via-zinc-900/5 via-50% to-amber-200/20 to-100%
        hover:bg-amber-500
        ${hidden && "hidden"}`}
      onClick={handleNav}
    >
      {option.toUpperCase()}
    </div>
  );
};

export default DropdownOption;

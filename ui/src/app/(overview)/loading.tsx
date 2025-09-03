import FilterBar from "../components/FilterBar";

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-12 rounded-2xl bg-sky-100/10">
      <FilterBar />
      <h3 className="text-sky-200 text-4xl font-bold">
        Loading giveaways . . .
      </h3>
    </div>
  );
};

export default Loading;

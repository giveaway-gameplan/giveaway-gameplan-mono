import { Suspense } from "react";
import FilterBar from "../components/FilterBar";

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-12 rounded-2xl bg-white/4 backdrop-blur-[1px]">
      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>
      <h3 className="text-[hsl(48,90%,95%)] text-4xl font-bold">
        Loading giveaways . . .
      </h3>
    </div>
  );
};

export default Loading;

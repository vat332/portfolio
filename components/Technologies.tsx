import { technologies } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";

const Technologies = () => {
  return (
    <div className="py-20" id="technologies">
      <h1 className="heading">
        Technologie, których używam{" "}
        <span className="text-purple-300">najczęsciej</span>
      </h1>
      <div className="flex flex-col items-center">
        <div className="h-[50vh] md:h-[30rem]  rounded-md flex flex-col antialiased items-center relative overflow-hidden">
          <InfiniteMovingCards
            items={technologies}
            direction="right"
            speed="fast"
          />
        </div>
      </div>
    </div>
  );
};

export default Technologies;

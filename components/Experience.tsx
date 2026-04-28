/* eslint-disable @next/next/no-img-element */
import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

const calculateDuration = (start: string, end: string | null) => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  
  const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
  const months = Math.max(1, totalMonths); // Minimum 1 miesiąc

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  const result: string[] = [];
  if (years > 0) {
    const yearWord = years === 1 ? 'rok' : (years >= 2 && years <= 4) ? 'lata' : 'lat';
    result.push(`${years} ${yearWord}`);
  }
  if (remainingMonths > 0) {
    const monthWord = remainingMonths === 1 ? 'miesiąc' : (remainingMonths >= 2 && remainingMonths <= 4) ? 'miesiące' : 'miesięcy';
    result.push(`${remainingMonths} ${monthWord}`);
  }
  
  return result.join(" ");
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatted = date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const Experience = () => {
  return (
    <div className="py-20" id="experience">
      <h1 className="heading">
        Moje <span className="text-purple-300">doświadczenie</span>
      </h1>
      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card: { id: number; title: string; desc: string; thumbnail: string; startDate: string; endDate: string | null }) => (
          <Button
            key={card.id}
            borderRadius="1.75rem"
            duration={Math.floor(Math.random() * 10000 + 10000)}
            className="flex-1 text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <img
                src={card.thumbnail}
                alt={card.thumbnail}
                className="lg:w-32 md:w-20"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold ">
                  {card.title}
                </h1>
                <div className="text-start text-purple-200 text-sm md:text-base font-medium mt-1">
                  {formatDate(card.startDate)} – {card.endDate ? formatDate(card.endDate) : "Obecnie"}
                  <span className="ml-2 text-slate-400 font-normal">
                    ({calculateDuration(card.startDate, card.endDate)})
                  </span>
                </div>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;

"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";

const Approach = () => {
  return (
    <section className="w-full py-20" id="approch">
      <h1 className="heading">
        Jak pracuję nad <span className="text-purple-300">projektami.</span>
      </h1>

      <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        <Card
          title="Planowanie"
          icon={<AceternityIcon order="Faza 1" />}
          des="Na początku wspólnie określimy cele strony, do kogo ma być skierowana i jakie funkcje powinna zawierać. Omówimy strukturę, nawigację oraz potrzebne treści — wszystko, co pozwoli mi lepiej zrozumieć Twoją wizję i potrzeby."
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
          />
        </Card>
        <Card
          title="Tworzenie & Aktualizacje"
          icon={<AceternityIcon order="Faza 2" />}
          des="Gdy ustalimy plan działania, zaczynam kodowanie — od pierwszych szkiców po działającą stronę."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
            colors={[
              [255, 166, 158],
              [221, 255, 247],
            ]}
            dotSize={2}
          />
        </Card>
        <Card
          title="Finalizacja & Publikacja"
          icon={<AceternityIcon order="Faza 3" />}
          des="To tutaj wszystko nabiera życia! Na podstawie zatwierdzonego projektu buduję w pełni funkcjonalną stronę. Dopilnuję, aby wszystko działało płynnie i wyglądało zgodnie z Twoimi oczekiwaniami."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  children,
  des,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center
       dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative lg:h-[35rem] rounded-3xl"
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* CanvasRevealEffect – pokazuj tylko na desktopie po hoverze */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0 hidden lg:block"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-10">
        {/* Ikona – widoczna tylko na desktopie bez hovera */}
        <div
          className="text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
          lg:group-hover/canvas-card:-translate-y-4 lg:group-hover/canvas-card:opacity-0 
          transition duration-200 min-w-40 mx-auto flex items-center justify-center"
        >
          {icon}
        </div>

        {/* Tytuł – zawsze widoczny na mobile, animacja tylko na desktopie */}
        <h2
          className="text-3xl font-bold text-center mt-4
            text-white transition duration-200
            opacity-100
            lg:opacity-0 lg:group-hover/canvas-card:opacity-100
            lg:group-hover/canvas-card:-translate-y-2"
        >
          {title}
        </h2>

        {/* Opis – zawsze widoczny na mobile, hover tylko na desktopie */}
        <p
          className="text-sm text-center mt-4
            text-white transition duration-200
            opacity-100
            lg:opacity-0 lg:group-hover/canvas-card:opacity-100
            lg:group-hover/canvas-card:-translate-y-2"
          style={{ color: "#E4ECFF" }}
        >
          {des}
        </p>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div className="hidden lg:block">
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px]">
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
       bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
          className="inline-flex h-full w-full cursor-pointer items-center 
      justify-center rounded-full bg-slate-950 px-5 py-2 text-purple backdrop-blur-3xl font-bold text-2xl"
        >
          {order}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: unknown) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

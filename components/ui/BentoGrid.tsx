/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaCopy, FaCheck } from "react-icons/fa6";

import ReactConfetti from "react-confetti";
import { cn } from "@/utils/cn";
import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";

const CONTACT_ITEMS = [
  {
    label: "Email",
    value: "sebastian.murawski0110@gmail.com",
    icon: <FaEnvelope className="w-4 h-4" />,
  },
  {
    label: "Telefon",
    value: "+48 123 456 789",
    icon: <FaPhone className="w-4 h-4" />,
  },
  {
    label: "LinkedIn",
    value: "sebastian-murawski332",
    icon: <FaLinkedin className="w-4 h-4" />,
  },
  {
    label: "GitHub",
    value: "vat332",
    icon: <FaGithub className="w-4 h-4" />,
  },
];

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["ReactJS", "NextJS", "Typescript"];
  const rightLists = ["Python", "Django", "MySQL"];

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const handleCopy = useCallback(async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      setSnackbar(`Skopiowano: ${value}`);
      setShowConfetti(true);

      setTimeout(() => setCopiedIndex(null), 2000);
      setTimeout(() => setSnackbar(null), 3000);
      setTimeout(() => setShowConfetti(false), 4000);
    } catch {
      setSnackbar("Nie udało się skopiować");
      setTimeout(() => setSnackbar(null), 3000);
    }
  }, []);

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-extralight max-w-50 md:max-w-72 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10 ${id === 6 ? "mb-6" : ""}`}
          >
            {title}
          </div>
          {id === 2 && <GridGlobe />}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="mt-5 relative z-50">
              {/* Confetti */}
              {showConfetti && typeof document !== "undefined"
                ? createPortal(
                    <ReactConfetti
                      width={window.innerWidth}
                      height={window.innerHeight}
                      recycle={false}
                      numberOfPieces={200}
                      gravity={0.3}
                      style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none" }}
                    />,
                    document.body
                  )
                : null}

              {/* Snackbar */}
              {typeof document !== "undefined"
                ? createPortal(
                    <div
                      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] transition-all duration-300 ${
                        snackbar
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      <div className="px-6 py-3 rounded-xl bg-[#10132E] border border-purple-500/30 shadow-lg shadow-purple-500/10 backdrop-blur-lg">
                        <p className="text-sm font-medium text-white flex items-center gap-2">
                          <FaCheck className="text-emerald-400 w-4 h-4" />
                          {snackbar}
                        </p>
                      </div>
                    </div>,
                    document.body
                  )
                : null}

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {CONTACT_ITEMS.map((item, index) => (
                  <button
                    key={item.label}
                    onClick={() => handleCopy(item.value, index)}
                    className="group relative flex items-center gap-3 p-3 rounded-xl bg-[#0c0e23]/80 border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300 cursor-pointer text-left"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-purple-300 group-hover:text-purple-200 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                        {item.label}
                      </p>
                      <p className="text-xs text-white truncate mt-0.5">
                        {item.value}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-slate-500 group-hover:text-purple-300 transition-colors">
                      {copiedIndex === index ? (
                        <FaCheck className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <FaCopy className="w-3 h-3" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

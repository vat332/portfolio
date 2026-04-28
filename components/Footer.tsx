/* eslint-disable @next/next/no-img-element */
"use client";

import { socialMedia } from "@/data";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaCopy, FaCheck } from "react-icons/fa6";
import { useState, useCallback } from "react";
import ReactConfetti from "react-confetti";

interface ContactItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    label: "Email",
    value: "sebastian.murawski0110@gmail.com",
    icon: <FaEnvelope className="w-5 h-5" />,
    href: "mailto:sebastian.murawski0110@gmail.com",
  },
  {
    label: "Telefon",
    value: "+48 123 456 789",
    icon: <FaPhone className="w-5 h-5" />,
    href: "tel:+48123456789",
  },
  {
    label: "LinkedIn",
    value: "sebastian-murawski332",
    icon: <FaLinkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/sebastian-murawski332/",
  },
  {
    label: "GitHub",
    value: "vat332",
    icon: <FaGithub className="w-5 h-5" />,
    href: "https://github.com/vat332",
  },
];

const Footer = () => {
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
    <footer className="w-full pb-10 mb-[100px] md:mb-5 relative" id="contact">
      {/* Confetti */}
      {showConfetti && (
        <ReactConfetti
          width={typeof window !== "undefined" ? window.innerWidth : 1200}
          height={typeof window !== "undefined" ? window.innerHeight : 800}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 100, pointerEvents: "none" }}
        />
      )}

      {/* Snackbar */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[101] transition-all duration-300 ${
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
      </div>

      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="flex flex-col items-center relative z-10">
        <h1 className="heading lg:max-w-[45vw]">
          Chcesz rozpocząć wspólny{" "}
          <span className="text-purple-300">projekt?</span>
        </h1>
        <p className="text-slate-400 mt-4 text-center max-w-lg">
          Skontaktuj się ze mną — kliknij dane kontaktowe, by je skopiować.
        </p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 w-full max-w-2xl">
          {CONTACT_ITEMS.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleCopy(item.value, index)}
              className="group relative flex items-center gap-4 p-4 rounded-xl bg-[#0c0e23]/80 border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300 cursor-pointer text-left"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-purple-300 group-hover:text-purple-200 transition-colors">
                {item.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                  {item.label}
                </p>
                <p className="text-sm text-white truncate mt-0.5">
                  {item.value}
                </p>
              </div>

              {/* Copy indicator */}
              <div className="flex-shrink-0 text-slate-500 group-hover:text-purple-300 transition-colors">
                {copiedIndex === index ? (
                  <FaCheck className="w-4 h-4 text-emerald-400" />
                ) : (
                  <FaCopy className="w-4 h-4" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center relative z-10">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2025
        </p>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((profile) => (
            <div
              key={profile.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-100 rounded-lg border border-black-100"
            >
              <a href={profile.link} target="_blank" rel="noreferrer">
                <img
                  src={profile.img}
                  alt={profile.link}
                  width={20}
                  height={20}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

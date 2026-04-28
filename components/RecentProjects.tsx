/* eslint-disable @next/next/no-img-element */
"use client";

import { projects } from "@/data";
import { FaLocationArrow, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaGithub, FaTimes, FaExpand } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

type ProjectType =
  | { type: "standard"; title: string; des: string; longDes?: string; img: string; images?: string[]; iconLists: string[]; link: string; github: string }
  | { type: "sub"; title: string; des: string; longDes?: string; images: string[]; iconLists: string[]; link: string; github: string; accentColor: string };

const RecentProjects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section className="py-20" id="projects">
      <h1 className="heading">
        Kilka najnowszych <span className="text-purple-300">projektów</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 px-2">
        {projects.map((project) => {
          if (project.type === "split" && "subProjects" in project) {
            return (
              <SplitProjectCard
                key={project.id}
                subProjects={
                  project.subProjects as {
                    title: string;
                    des: string;
                    images: string[];
                    iconLists: string[];
                    link: string;
                    github: string;
                    accentColor: string;
                  }[]
                }
                onProjectClick={(sub) => setSelectedProject({ type: "sub", ...sub })}
              />
            );
          }

          return (
            <StandardProjectCard
              key={project.id}
              title={project.title}
              des={project.des}
              img={project.img}
              iconLists={project.iconLists}
              link={project.link}
              github={project.github}
              onClick={() => setSelectedProject({ type: "standard", ...project })}
            />
          );
        })}
      </div>

      {/* Project Modal */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

/* ─── Project Modal ─── */
const ProjectModal = ({ project, onClose }: { project: ProjectType; onClose: () => void }) => {
  const images = project.images?.length ? project.images : ('img' in project ? [project.img] : []);
  const description = project.longDes || project.des;
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, isFullscreen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#04071D]/90 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0C0E23] border border-white/[0.1] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center gap-4 bg-[#10132E]/50">
          <h2 className="text-xl md:text-2xl font-bold text-white flex-1">{project.title}</h2>
          <div className="flex gap-3 items-center">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-200 hover:text-white hover:border-cyan-500/50 transition-all flex items-center gap-2 font-medium text-sm"
            >
              Demo <FaLocationArrow className="w-3 h-3" />
            </a>
            
            {/* Close button moved to header flow to prevent overlap */}
            <div className="w-px h-8 bg-white/10 mx-1 hidden sm:block"></div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-red-500/80 transition-all border border-white/10"
              title="Zamknij"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
          {/* Gallery */}
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden bg-black/50 border border-white/5 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                alt={`${project.title} - ${currentImage + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-contain"
              />
            </AnimatePresence>

            {/* Expand Button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all border border-white/10"
              title="Powiększ na cały ekran"
            >
              <FaExpand className="w-4 h-4" />
            </button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all border border-white/10"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all border border-white/10"
                >
                  <FaChevronRight />
                </button>
                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white/80 text-xs backdrop-blur-md border border-white/10">
                  {currentImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">O projekcie</h3>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
              {description}
            </p>
          </div>

          {/* Technologies */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Technologie</h3>
            <div className="flex flex-wrap gap-3">
              {project.iconLists.map((icon, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                >
                  <img src={icon} alt="tech icon" className="w-7 h-7" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Image Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-[#04071D]/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-red-500/80 transition-all border border-white/20"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full p-4 md:p-12 flex items-center justify-center">
              <img
                src={images[currentImage]}
                alt={`${project.title} - Fullscreen ${currentImage + 1}`}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
              />
              {/* Navigation Arrows for Fullscreen */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
                  >
                    <FaChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
                  >
                    <FaChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-black/60 text-white/90 font-medium backdrop-blur-md border border-white/20">
                    {currentImage + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Standard Project Card ─── */
interface StandardProjectCardProps {
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
  github: string;
  onClick: () => void;
}

const StandardProjectCard: React.FC<StandardProjectCardProps> = ({
  title,
  des,
  img,
  iconLists,
  link,
  github,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[shimmer_3s_linear_infinite] bg-[length:200%_100%]" />

      {/* Card body */}
      <div className="relative rounded-2xl bg-[#0c0e23]/90 backdrop-blur-sm border border-white/[0.08] group-hover:border-white/[0.15] transition-all duration-500 h-full flex flex-col">
        {/* Image area */}
        <div className="relative overflow-hidden rounded-t-2xl h-[200px] lg:h-[220px]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#13162d] to-[#0c0e23]" />
          <img
            src={img}
            alt={title}
            className="relative z-10 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e23] via-transparent to-transparent z-20" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg lg:text-xl text-white line-clamp-1 mb-2">
            {title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-1">
            {des}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]">
            {/* Tech icons */}
            <div className="flex items-center">
              {iconLists.map((icon, index) => (
                <div
                  key={icon}
                  className="border border-white/[0.12] rounded-full bg-[#10132E] w-8 h-8 lg:w-9 lg:h-9 flex justify-center items-center"
                  style={{
                    transform: `translateX(-${5 * index * 2}px)`,
                    zIndex: iconLists.length - index,
                  }}
                >
                  <img src={icon} alt={icon} className="p-1.5" />
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                  aria-label={`GitHub — ${title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              )}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-purple-300 hover:text-purple-200 transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                Demo
                <FaLocationArrow className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Split (Dual) Project Card ─── */
interface SubProject {
  title: string;
  des: string;
  images: string[];
  iconLists: string[];
  link: string;
  github: string;
  accentColor: string;
}

interface SplitProjectCardProps {
  subProjects: SubProject[];
  onProjectClick: (sub: SubProject) => void;
}

const SplitProjectCard: React.FC<SplitProjectCardProps> = ({
  subProjects,
  onProjectClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="group relative rounded-2xl overflow-hidden md:col-span-2 lg:col-span-2"
    >
      {/* Animated gradient border — uses both accent colors */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/25 via-purple-500/25 to-cyan-500/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[shimmer_3s_linear_infinite] bg-[length:200%_100%]" />

      {/* Card body */}
      <div className="relative rounded-2xl bg-[#0c0e23]/90 backdrop-blur-sm border border-white/[0.08] group-hover:border-white/[0.15] transition-all duration-500 h-full flex flex-col">
        {/* Header badge */}
        <div className="px-5 pt-4 pb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/[0.08] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            2 projekty w jednym
          </span>
        </div>

        {/* Sub-projects */}
        <div className="flex flex-col md:flex-row md:divide-x md:divide-y-0 divide-y divide-white/[0.06] flex-1">
          {subProjects.map((sub, idx) => (
            <SubProjectSection 
              key={sub.title} 
              sub={sub} 
              idx={idx} 
              onClick={() => onProjectClick(sub)} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Sub-project section with image gallery ─── */
interface SubProjectSectionProps {
  sub: SubProject;
  idx: number;
  onClick: () => void;
}

const SubProjectSection: React.FC<SubProjectSectionProps> = ({ sub, idx, onClick }) => {
  const isCyan = sub.accentColor === "cyan";
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % sub.images.length);
  }, [sub.images.length]);

  useEffect(() => {
    if (sub.images.length <= 1) return;
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, [sub.images.length, nextImage]);

  return (
    <div 
      className="p-5 flex flex-col flex-1 md:w-1/2 cursor-pointer hover:bg-white/[0.02] transition-colors"
      onClick={onClick}
    >
      {/* Image gallery */}
      <div className="relative overflow-hidden rounded-xl h-[180px] mb-3">
        <div
          className={`absolute inset-0 ${
            isCyan
              ? "bg-gradient-to-br from-cyan-900/30 to-[#0c0e23]"
              : "bg-gradient-to-br from-purple-900/30 to-[#0c0e23]"
          }`}
        />
        <AnimatePresence mode="wait">
          <motion.img
            key={`${idx}-${currentImage}`}
            src={sub.images[currentImage]}
            alt={`${sub.title} — screenshot ${currentImage + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full h-full object-cover object-top rounded-xl"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e23]/80 via-transparent to-transparent z-20" />

        {/* Dot indicators */}
        {sub.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
            {sub.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentImage
                    ? isCyan
                      ? "bg-cyan-400 w-4"
                      : "bg-purple-400 w-4"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Pokaż screenshot ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <h3
        className={`font-bold text-base lg:text-lg mb-1 ${
          isCyan ? "text-cyan-300" : "text-purple-300"
        }`}
      >
        {sub.title}
      </h3>
      <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed flex-1">
        {sub.des}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {sub.iconLists.map((icon, index) => (
            <div
              key={`${idx}-${icon}`}
              className="border border-white/[0.12] rounded-full bg-[#10132E] w-7 h-7 flex justify-center items-center"
              style={{
                transform: `translateX(-${5 * index * 2}px)`,
                zIndex: sub.iconLists.length - index,
              }}
            >
              <img src={icon} alt={icon} className="p-1.5" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {sub.github && (
            <a
              href={sub.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors duration-300"
              aria-label={`GitHub — ${sub.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="w-4 h-4" />
            </a>
          )}
          <a
            href={sub.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 text-xs font-medium transition-colors duration-300 ${
              isCyan
                ? "text-cyan-300 hover:text-cyan-200"
                : "text-purple-300 hover:text-purple-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            Demo
            <FaLocationArrow className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;

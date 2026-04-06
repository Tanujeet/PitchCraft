"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Presentation } from "lucide-react";

interface Slide {
  id?: string;
  title: string;
  content: string;
}

const Slides = ({ slides }: { slides: Slide[] }) => {
  // We need to track direction to know which way to animate the slides
  const [[page, direction], setPage] = useState([0, 0]);

  const currentIndex = page;
  const currentSlide = slides[currentIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Framer motion variants for directional sliding
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-neutral-500 bg-neutral-900/30 rounded-2xl border border-neutral-800">
        <Presentation className="w-10 h-10 mb-4 opacity-50" />
        <p>No slides available.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Slide Content Area - Fixed height to prevent jumping */}
      <div className="relative w-full min-h-[400px] sm:min-h-[450px] flex items-center justify-center p-8 sm:p-12 overflow-hidden bg-gradient-to-b from-neutral-900/50 to-neutral-950">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full max-w-2xl flex flex-col items-center sm:items-start absolute"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white text-center sm:text-left tracking-tight">
              {currentSlide?.title}
            </h2>
            <div className="text-left space-y-4 w-full">
              {currentSlide?.content
                ?.split("\n")
                .filter((point) => point.trim() !== "") // Remove empty lines
                .map((point, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    key={i}
                    className="flex items-start gap-3 text-neutral-300 text-base sm:text-lg leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    <p>
                      {
                        point.replace(
                          /^[-•*]\s*/,
                          "",
                        ) /* Strip existing bullets if any */
                      }
                    </p>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between p-4 sm:p-6 bg-neutral-900 border-t border-neutral-800 relative z-10">
        <button
          onClick={() => paginate(-1)}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-neutral-300 hover:text-white hover:bg-neutral-800"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:block">Previous</span>
        </button>

        {/* Segmented Progress Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-gradient-to-r from-purple-500 to-pink-500"
                  : "w-1.5 sm:w-2 bg-neutral-700"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          disabled={currentIndex === slides.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white text-neutral-950 hover:bg-neutral-200 shadow-lg shadow-white/5 active:scale-95"
        >
          <span className="hidden sm:block">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Slides;

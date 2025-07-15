"use client";
import { useState } from "react";

interface Slide {
  title: string;
  content: string;
}

const Slides = ({ slides }: { slides: Slide[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full text-center">
      {/* Slide Content */}
      <div className="min-h-[300px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">{currentSlide?.title}</h2>
        <div className="text-left space-y-2">
          {currentSlide?.content?.split("\n").map((point, i) => (
            <p key={i}>• {point}</p>
          ))}
        </div>
      </div>

      {/* Slide Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        <p className="text-sm text-gray-500">
          Slide {currentIndex + 1} of {slides.length}
        </p>

        <button
          onClick={() =>
            setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
          }
          disabled={currentIndex === slides.length - 1}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Slides;

"use client";

import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";

type SlidesProps = {
  slides: { title: string; content: any }[];
};

const Slides = ({ slides }: SlidesProps) => {
  return (
    <div className="space-y-4 text-center">
      {slides.map((slide, idx) => (
        <div key={idx} className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-bold text-xl">
            Slide {idx + 1}: {slide.title}
          </h2>
          <p>{slide.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Slides;

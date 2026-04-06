"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, Loader2, Presentation } from "lucide-react";
import Slides from "./Slides";

interface Slide {
  id?: string;
  title: string;
  content: string;
}

export default function ViewSlidesDialog({ projectId }: { projectId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch slides only when the modal opens
  useEffect(() => {
    if (isOpen && slides.length === 0) {
      const fetchSlides = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/slides/view?projectId=${projectId}`);
          const data = await res.json();
          setSlides(data);
        } catch (err) {
          console.error("Failed to load slides", err);
        } finally {
          setLoading(false);
        }
      };
      fetchSlides();
    }
  }, [isOpen, projectId, slides.length]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 hover:bg-neutral-800 text-neutral-300 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm"
      >
        <Eye className="w-4 h-4" />
        Preview
      </button>

      {/* Animated Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-800 bg-neutral-950/50">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <Presentation className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    Slides Preview
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto bg-neutral-950 p-4 sm:p-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    <p className="text-neutral-400 font-medium animate-pulse">
                      Fetching presentation...
                    </p>
                  </div>
                ) : slides.length > 0 ? (
                  <div className="rounded-xl overflow-hidden ring-1 ring-neutral-800 shadow-2xl">
                    <Slides slides={slides} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 text-neutral-500">
                    <Presentation className="w-12 h-12 mb-4 opacity-20" />
                    <p>No slides found for this project.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

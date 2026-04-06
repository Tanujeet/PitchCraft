"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Lightbulb, X, ArrowRight, Loader2 } from "lucide-react";
import Slides from "@/components/Slides";
import { axiosInstance } from "@/lib/axios";

const EXAMPLES = [
  "A subscription app for indie bookstores",
  "AI tutor for rural students",
  "Zero-waste grocery delivery",
];

const MAX_CHARS = 500;

const Page = () => {
  const [idea, setIdea] = useState("");
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [projectId, setProjectId] = useState("");

  const router = useRouter();

  const generateSlides = async () => {
    if (!idea.trim()) return;
    try {
      setLoading(true);
      setModalOpen(true);
      const res = await axiosInstance.post("/slides/generate", { idea });
      const { projectId, slides } = res.data;
      setSlides(slides);
      setProjectId(projectId);
      setIdea("");
    } catch (error) {
      console.error("Slide generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIdea = (val: string) => {
    if (val.length <= MAX_CHARS) setIdea(val);
  };

  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-50 overflow-hidden flex items-center justify-center p-4 sm:p-8 font-sans">
      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"
      />

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl bg-neutral-900/60 backdrop-blur-2xl border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs sm:text-sm font-medium mb-8 border border-purple-500/20">
          <Sparkles className="w-4 h-4" />
          AI-powered pitch builder
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
          Describe your idea.
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent italic">
            Let AI craft your pitch.
          </span>
        </h1>

        <p className="text-neutral-400 text-sm sm:text-base mb-8">
          Turn a rough idea into a compelling slide deck in seconds.
        </p>

        {/* Textarea */}
        <div className="relative mb-6">
          <textarea
            className="w-full bg-neutral-950/50 border border-neutral-800 rounded-2xl p-4 sm:p-5 text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none h-36 transition-all"
            value={idea}
            onChange={(e) => handleIdea(e.target.value)}
            placeholder="An app that connects local artists with businesses for mural projects..."
          />
          <span className="absolute bottom-4 right-4 text-xs text-neutral-500 font-medium">
            {idea.length} / {MAX_CHARS}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <button
            onClick={generateSlides}
            disabled={loading || !idea.trim()}
            className="flex-1 flex items-center justify-center gap-2 bg-white text-neutral-950 hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 font-semibold rounded-xl px-6 py-3.5 transition-all duration-200 active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate slides"
            )}
          </button>
          <button
            onClick={() => setIdea("")}
            disabled={loading || !idea}
            className="px-6 py-3.5 rounded-xl border border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white disabled:opacity-50 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        {/* Tip Section */}
        <div className="flex items-start gap-3 bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 mb-8">
          <Lightbulb className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-neutral-300 leading-relaxed">
            <strong className="text-blue-400 font-semibold">Tip:</strong> Write
            your idea like you're pitching to an investor — include the problem,
            your solution, and who it's for.
          </p>
        </div>

        {/* Example Chips */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
            Try an example
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                key={ex}
                onClick={() => setIdea(ex)}
                className="px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 text-xs sm:text-sm text-neutral-300 hover:text-white transition-all active:scale-95"
              >
                {ex}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Slide Generation Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget && !loading) setModalOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                <span className="text-lg font-semibold text-white">
                  Your Pitch Deck
                </span>
                <button
                  onClick={() => !loading && setModalOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-neutral-950/50">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-6">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-4 border-neutral-800"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-neutral-400 font-medium animate-pulse">
                      Synthesizing your concept...
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Assuming Slides component handles its own layout, but wrapping it to be safe */}
                    <div className="w-full rounded-xl overflow-hidden border border-neutral-800">
                      <Slides slides={slides} />
                    </div>

                    <button
                      onClick={() => router.push(`/dashboard/${projectId}`)}
                      className="flex items-center justify-center gap-2 w-full sm:w-auto self-end bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-8 py-3.5 transition-colors"
                    >
                      Continue to editor
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Page;

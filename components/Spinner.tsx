"use client";

import { motion } from "framer-motion";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center gap-2.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 1, 0.4],
            y: [0, -6, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

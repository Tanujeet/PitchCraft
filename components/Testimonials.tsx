"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          What Founders Are Saying
        </h2>
        <p className="text-neutral-400 text-lg">
          Join the founders who are raising capital faster.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Testimonial 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl relative group hover:bg-neutral-800/50 transition-colors"
        >
          <Quote className="absolute top-6 right-6 w-8 h-8 text-neutral-800 group-hover:text-purple-500/20 transition-colors" />

          <p className="text-neutral-300 text-base leading-relaxed mb-8 relative z-10">
            “PitchCraft has been a game-changer for our fundraising efforts. The
            AI-generated slides are incredibly professional, and the editor is a
            breeze to use. We secured our seed funding thanks to PitchCraft!”
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
              <img
                src="/avatars/female-founder.png"
                alt="Sophia Chen"
                className="w-full h-full rounded-full object-cover border-2 border-neutral-900"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.innerHTML =
                    '<span class="flex items-center justify-center w-full h-full bg-neutral-900 rounded-full text-sm font-bold text-white">SC</span>';
                }}
              />
            </div>
            <div>
              <h4 className="font-semibold text-white">Sophia Chen</h4>
              <p className="text-sm text-neutral-500">Founder, InnovateTech</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonial 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-2xl relative group hover:bg-neutral-800/50 transition-colors"
        >
          <Quote className="absolute top-6 right-6 w-8 h-8 text-neutral-800 group-hover:text-blue-500/20 transition-colors" />

          <p className="text-neutral-300 text-base leading-relaxed mb-8 relative z-10">
            “As a non-designer, creating a compelling pitch deck was daunting.
            PitchCraft made it easy to present our vision clearly and
            effectively. The team collaboration feature is also a huge plus.”
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-[2px]">
              <img
                src="/avatars/male-founder.png"
                alt="Ethan Walker"
                className="w-full h-full rounded-full object-cover border-2 border-neutral-900"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.innerHTML =
                    '<span class="flex items-center justify-center w-full h-full bg-neutral-900 rounded-full text-sm font-bold text-white">EW</span>';
                }}
              />
            </div>
            <div>
              <h4 className="font-semibold text-white">Ethan Walker</h4>
              <p className="text-sm text-neutral-500">CEO, GreenSolutions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

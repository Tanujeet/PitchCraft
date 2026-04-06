"use client";

import { motion } from "framer-motion";
import { MessageSquare, Sparkles, Share } from "lucide-react";

const HowItWorksSection = () => {
  const howItWorksItems = [
    {
      step: "01",
      title: "Describe your startup idea",
      description:
        "Provide a brief overview of your startup, including your mission, target audience, and key features.",
      icon: <MessageSquare className="w-5 h-5 text-purple-400" />,
      color: "from-purple-400 to-purple-600",
    },
    {
      step: "02",
      title: "AI generates your pitch deck",
      description:
        "Our AI algorithms analyze your input and create a comprehensive pitch deck tailored to your startup’s needs.",
      icon: <Sparkles className="w-5 h-5 text-pink-400" />,
      color: "from-pink-400 to-pink-600",
    },
    {
      step: "03",
      title: "Edit, export, and share",
      description:
        "Customize your pitch deck with our intuitive editor, export it as a PDF, and share it with investors or your team.",
      icon: <Share className="w-5 h-5 text-blue-400" />,
      color: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      <div className="text-center mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-4 text-white"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 text-lg max-w-2xl mx-auto"
        >
          From a raw idea to an investor-ready deck in three simple steps.
        </motion.p>
      </div>

      <div className="relative">
        {/* Desktop Connecting Line */}
        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-neutral-800 via-purple-500/50 to-neutral-800 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
          {howItWorksItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Step Number/Icon Container */}
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center shadow-xl group-hover:-translate-y-2 transition-transform duration-300 relative z-10 overflow-hidden">
                  {/* Subtle background glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-15 transition-opacity duration-300`}
                  />
                  <span
                    className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br ${item.color}`}
                  >
                    {item.step}
                  </span>
                </div>

                {/* Floating Icon */}
                <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-lg z-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neutral-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed max-w-sm text-sm sm:text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

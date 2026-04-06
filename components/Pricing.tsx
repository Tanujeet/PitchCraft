"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const Pricing = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-4 text-white"
        >
          Simple, Transparent Pricing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 text-lg max-w-2xl mx-auto"
        >
          Choose the plan that fits your startup’s needs. Start for free,
          upgrade anytime.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
        {/* Free Plan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-900/40 border border-neutral-800 p-8 rounded-3xl flex flex-col backdrop-blur-sm"
        >
          <h3 className="text-2xl font-semibold text-white">Free</h3>
          <p className="mt-2 text-neutral-400">Perfect to test the waters</p>
          <div className="mt-6 mb-8">
            <span className="text-5xl font-extrabold text-white">$0</span>
            <span className="text-neutral-500 font-medium">/month</span>
          </div>

          <ul className="space-y-4 text-neutral-300 flex-1">
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-neutral-400" /> 1 project
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-neutral-400" /> AI pitch deck
              generation
            </li>
            <li className="flex items-center gap-3 text-neutral-500">
              <X className="w-5 h-5 text-neutral-600" /> Limited export (no PDF)
            </li>
          </ul>

          <button className="mt-8 w-full bg-neutral-800 text-white py-3.5 rounded-xl hover:bg-neutral-700 transition-colors font-medium">
            Get Started
          </button>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-b from-purple-900/20 to-neutral-900/60 border border-purple-500/50 p-8 rounded-3xl relative flex flex-col backdrop-blur-sm shadow-2xl shadow-purple-900/20"
        >
          <div className="absolute top-0 right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-b-lg tracking-wider uppercase shadow-lg">
            Most Popular
          </div>

          <h3 className="text-2xl font-semibold text-white">Pro</h3>
          <p className="mt-2 text-purple-300/70">
            For serious founders & teams
          </p>
          <div className="mt-6 mb-8">
            <span className="text-5xl font-extrabold text-white">$29</span>
            <span className="text-neutral-500 font-medium">/month</span>
          </div>

          <ul className="space-y-4 text-neutral-200 flex-1">
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-purple-400" /> Unlimited pitch
              decks
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-purple-400" /> PDF export & sharing
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-purple-400" /> Real-time team
              collaboration
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-purple-400" /> Access to all custom
              themes
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-purple-400" /> Priority support
            </li>
          </ul>

          <button className="mt-8 w-full bg-white text-neutral-950 py-3.5 rounded-xl hover:bg-neutral-200 transition-colors font-semibold shadow-lg shadow-white/10 active:scale-[0.98]">
            Upgrade to Pro
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

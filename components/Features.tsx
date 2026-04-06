"use client";

import { motion } from "framer-motion";
import {
  Wand2,
  Layout,
  Share2,
  Users,
  CreditCard,
  Palette,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "AI-Generated Slides",
      description:
        "Automatically generate compelling slides with AI-powered content and design.",
      icon: <Wand2 className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Notion-Like Slide Editor",
      description:
        "Easily edit and customize your slides with our intuitive, Notion-like editor.",
      icon: <Layout className="w-6 h-6 text-pink-400" />,
    },
    {
      title: "PDF Export & Sharable Links",
      description:
        "Export your pitch deck as a PDF or share it with a unique, trackable link.",
      icon: <Share2 className="w-6 h-6 text-blue-400" />,
    },
    {
      title: "Team Collaboration",
      description:
        "Collaborate with your team in real-time to refine and perfect your pitch deck.",
      icon: <Users className="w-6 h-6 text-orange-400" />,
    },
    {
      title: "Stripe Billing Integration",
      description:
        "Seamlessly manage your subscription and billing with Stripe integration.",
      icon: <CreditCard className="w-6 h-6 text-green-400" />,
    },
    {
      title: "Custom Themes",
      description:
        "Choose from a variety of custom themes to match your brand's style.",
      icon: <Palette className="w-6 h-6 text-yellow-400" />,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
          Everything you need to pitch
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Powerful tools designed to help you craft, edit, and share your vision
          with the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="group bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 hover:bg-neutral-800/60 transition-all duration-300 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;

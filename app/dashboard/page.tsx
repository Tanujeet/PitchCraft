"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Target, Layers, BarChart3, Plus } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import RecentPitches from "@/components/RecentPitches";
import QuickAction from "@/components/QuickAction";

interface Summary {
  totalPitch: number;
  totalSlides: number;
  averageSlidesPerPitch: number;
}

const STAT_CONFIG = [
  {
    icon: Target,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "group-hover:shadow-purple-500/10",
  },
  {
    icon: Layers,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    glow: "group-hover:shadow-teal-500/10",
  },
  {
    icon: BarChart3,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "group-hover:shadow-amber-500/10",
  },
];

// Added strict Framer Motion typing here
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Added strict Framer Motion typing here
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const username = user?.firstName || "there";

  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get("/summary");
        setSummary(res.data);
      } catch (e) {
        console.error("Failed to fetch summary", e);
      }
    };
    fetchSummary();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    year: "numeric",
  });

  const stats = summary
    ? [
        {
          label: "Total pitches",
          value: summary.totalPitch,
          sub: "All time",
        },
        {
          label: "Total slides",
          value: summary.totalSlides,
          sub: "Across all pitches",
        },
        {
          label: "Avg slides / pitch",
          value: summary.averageSlidesPerPitch.toFixed(1),
          sub: "Industry avg: 8.2",
        },
      ]
    : null;

  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-50 p-4 sm:p-8 lg:p-12 overflow-hidden font-sans">
      {/* Subtle Background Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto space-y-12"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="text-neutral-400 text-sm font-medium tracking-wide uppercase mb-2">
              {today}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Welcome back,{" "}
              <em className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent not-italic">
                {username}
              </em>
            </h1>
          </div>
          <button
            onClick={() => router.push("/create")}
            className="group flex items-center justify-center gap-2 bg-white text-neutral-950 hover:bg-neutral-200 font-semibold rounded-xl px-6 py-3 transition-all duration-200 active:scale-95 shadow-lg shadow-white/5"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            New pitch
          </button>
        </motion.div>

        {/* Stat Cards Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats === null
            ? [0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-neutral-800 animate-pulse mb-6" />
                  <div className="w-24 h-4 bg-neutral-800 rounded animate-pulse mb-3" />
                  <div className="w-16 h-8 bg-neutral-800 rounded animate-pulse mb-2" />
                  <div className="w-32 h-3 bg-neutral-800 rounded animate-pulse" />
                </motion.div>
              ))
            : stats.map((stat, i) => {
                const config = STAT_CONFIG[i];
                const Icon = config.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className={`group relative bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm hover:bg-neutral-800/50 transition-all duration-300 shadow-xl ${config.glow}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${config.bg} ${config.border} ${config.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-neutral-400 text-sm font-medium mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-neutral-500">{stat.sub}</p>

                    {/* Hover Accent Line */}
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-t-full transition-all duration-300 group-hover:w-1/2 ${config.bg.replace("/10", "")}`}
                    />
                  </motion.div>
                );
              })}
        </motion.div>

        {/* Bottom Layout: 2/3 and 1/3 split on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.section
            variants={itemVariants}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Recent activity
            </h2>
            <div className="flex-1 bg-neutral-900/40 border border-neutral-800 rounded-2xl p-1 backdrop-blur-sm shadow-xl">
              <RecentPitches />
            </div>
          </motion.section>

          {/* Quick Actions */}
          <motion.section
            variants={itemVariants}
            className="lg:col-span-1 flex flex-col gap-4"
          >
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Quick actions
            </h2>
            <div className="flex-1 bg-neutral-900/40 border border-neutral-800 rounded-2xl p-1 backdrop-blur-sm shadow-xl">
              <QuickAction />
            </div>
          </motion.section>
        </div>
      </motion.div>
    </main>
  );
};

export default Page;

"use client";

import Features from "@/components/Features";
import HowItWorksSection from "@/components/HowItWorksSection";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Sparkles, Loader2, PlayCircle } from "lucide-react";

// Strongly typed variants for Framer Motion (Fixes the Vercel build error)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      router.push("/dashboard");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-purple-500/30">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[150px]"
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">PitchCraft</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <button className="text-sm font-medium text-neutral-300 hover:text-white px-4 py-2 transition-colors">
                Sign in
              </button>
            </Link>
            <Link href="/sign-in" className="hidden sm:block">
              <button className="text-sm font-semibold bg-white text-neutral-950 px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-32 pb-16 sm:pt-40 sm:pb-24">
        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-4 sm:px-6 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-neutral-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Powered by AI · Trusted by founders
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Craft the perfect pitch
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent italic pr-2">
              in minutes, not days.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-400 mb-10 leading-relaxed"
          >
            Describe your startup idea. PitchCraft turns it into a professional,
            investor-ready slide deck — instantly.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link href="/sign-in" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-neutral-950 hover:bg-neutral-200 font-semibold rounded-xl px-8 py-4 transition-all duration-200 hover:scale-105 active:scale-95">
                Create your pitch <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors font-medium">
                <PlayCircle className="w-5 h-5" /> See how it works
              </button>
            </a>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-sm text-neutral-500 mb-16"
          >
            No credit card required · Free to start
          </motion.p>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-3"
          >
            <div className="flex -space-x-3">
              {[
                "from-blue-400 to-blue-600",
                "from-purple-400 to-purple-600",
                "from-pink-400 to-pink-600",
                "from-orange-400 to-orange-600",
              ].map((gradient, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 border-neutral-950 bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}
                >
                  <span className="text-xs font-bold text-white/90">
                    {["A", "B", "C", "D"][i]}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-neutral-400">
              Loved by <strong className="text-white">2,400+ founders</strong>{" "}
              worldwide
            </p>
          </motion.div>
        </motion.section>

        {/* App Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto px-4 sm:px-6 mt-20 relative"
        >
          {/* Subtle glow behind mockup */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl -z-10 rounded-full scale-y-50"></div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
            {/* Browser Header */}
            <div className="bg-neutral-950/50 border-b border-neutral-800 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>

            {/* Mockup Content */}
            <div className="p-6 sm:p-8">
              <div className="bg-neutral-950/50 border border-neutral-800 rounded-xl p-4 mb-8 text-neutral-300 font-mono text-sm shadow-inner flex items-start gap-3">
                <span className="text-xl">💡</span>
                <p>
                  An app that connects local artists with businesses for mural
                  projects across the city...
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "The Problem",
                    body: "Businesses struggle to find local art talent for meaningful brand spaces.",
                    border: "border-red-500/30",
                  },
                  {
                    title: "Our Solution",
                    body: "A curated marketplace matching muralists with commercial clients instantly.",
                    border: "border-purple-500/30",
                  },
                  {
                    title: "Market Size",
                    body: "$12B commercial art market with 80% of SMBs underserved today.",
                    border: "border-blue-500/30",
                  },
                ].map((s, i) => (
                  <motion.div
                    whileHover={{ y: -5 }}
                    key={s.title}
                    className={`bg-neutral-900 border ${s.border} rounded-xl p-5 shadow-lg transition-colors hover:bg-neutral-800/80`}
                  >
                    <div className="text-sm font-semibold text-white mb-2">
                      {s.title}
                    </div>
                    <div className="text-xs text-neutral-400 leading-relaxed">
                      {s.body}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Imported Sections */}
      <div className="relative z-10 divide-y divide-neutral-900">
        <section id="how-it-works" className="py-24 bg-neutral-950">
          <HowItWorksSection />
        </section>

        <section id="features" className="py-24 bg-neutral-950/50">
          <Features />
        </section>

        <section id="pricing" className="py-24 bg-neutral-950">
          <Pricing />
        </section>

        <section className="py-24 bg-neutral-950/50">
          <Testimonials />
        </section>
      </div>

      {/* Footer CTA */}
      <div className="relative z-10 border-t border-neutral-800 bg-neutral-900/30 py-24 px-4 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white tracking-tight">
          Your idea deserves a<br />
          <em className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent italic pr-2">
            great pitch.
          </em>
        </h2>
        <p className="text-neutral-400 mb-10 max-w-md mx-auto text-lg">
          Join thousands of founders who ship faster and raise smarter with
          PitchCraft.
        </p>
        <Link href="/sign-in">
          <button className="bg-white text-neutral-950 hover:bg-neutral-200 font-semibold rounded-xl px-8 py-4 transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-white/10">
            Create your pitch for free →
          </button>
        </Link>
      </div>

      {/* Footer Strip */}
      <footer className="relative z-10 border-t border-neutral-900 bg-neutral-950 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="font-semibold tracking-tight text-white">
              PitchCraft
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            © 2026 PitchCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

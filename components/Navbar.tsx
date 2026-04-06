"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Plus, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="sticky top-0 inset-x-0 z-50 h-16 border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
          PitchCraft
        </span>
      </Link>

      {/* Right side navigation & actions */}
      <ul className="flex items-center gap-2 sm:gap-6">
        {user && (
          <>
            <li className="relative">
              <Link
                href="/dashboard"
                className={`relative px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  pathname === "/dashboard"
                    ? "text-white"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <LayoutDashboard className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:inline">Dashboard</span>
                {pathname === "/dashboard" && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-500 rounded-t-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </li>
            <li>
              <button
                onClick={() => router.push("/create")}
                className="group hidden sm:flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 text-white text-sm font-semibold rounded-lg px-4 py-2 transition-all duration-200"
              >
                <Plus className="w-4 h-4 text-purple-400 group-hover:rotate-90 transition-transform duration-300" />
                New Pitch
              </button>
              {/* Mobile version of New Pitch button */}
              <button
                onClick={() => router.push("/create")}
                className="sm:hidden flex items-center justify-center w-8 h-8 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20"
              >
                <Plus className="w-4 h-4" />
              </button>
            </li>
          </>
        )}

        <li className="flex items-center pl-2 sm:pl-4 border-l border-neutral-800">
          {!isLoaded ? (
            <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse" />
          ) : user ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-8 h-8 rounded-full ring-2 ring-neutral-800 hover:ring-purple-500 transition-all",
                },
              }}
            />
          ) : (
            <SignInButton mode="modal">
              <button className="bg-white text-neutral-950 text-sm font-semibold rounded-lg px-4 py-2 hover:bg-neutral-200 transition-colors shadow-lg shadow-white/5 active:scale-95">
                Get Started
              </button>
            </SignInButton>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

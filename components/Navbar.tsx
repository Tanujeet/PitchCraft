"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  const { user, isLoaded } = useUser();
  return (
    <nav className="h-20 border-b border-black px-6 md:px-10 flex items-center justify-between">
      <Link href="/dashboard" className="text-2xl font-bold tracking-tight">
        Pitch<span className="text-blue-600">Craft</span>
      </Link>

      <ul className="flex gap-6 items-center text-lg">
        {user && (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Button>New Pitch</Button>
            </li>
          </>
        )}
        <li>
          {isLoaded && user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className="rounded-xl border border-black px-5 py-2 hover:bg-black hover:text-white transition">
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

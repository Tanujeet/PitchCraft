"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const navLinks = [
    { name: "Product", href: "/Product" },
    { name: "Pricing", href: "/Pricing" },
    { name: "Resources", href: "/Resources" },
  ];
  const { user, isLoaded } = useUser();
  return (
    <nav className="h-20 border-b border-black px-6 md:px-10 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold tracking-tight">
        Pitch<span className="text-blue-600">Craft</span>
      </Link>

      <ul className="flex gap-6 items-center text-lg">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <Link href={link.href} className="hover:underline">
              {link.name}
            </Link>
          </li>
        ))}
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

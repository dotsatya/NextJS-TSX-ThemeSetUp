"use client";

import React from "react";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Button } from "../ui/button";

/* ================= TYPES ================= */
interface NavItem {
  label: string;
  href: string;
}

interface NavLinksProps {
  className?: string;
  onClick?: () => void;
}

/* ================= CONSTANTS ================= */
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "All Projects", href: "/projects" },
];

/* ================= REUSABLE NAV ================= */
const NavLinks: React.FC<NavLinksProps> = ({ className, onClick }) => {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={className}
          onClick={onClick}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
};

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className="
          sticky top-2 z-40
          w-[96%] max-w-8xl mx-auto
          flex items-center justify-between
          px-5 py-3
          rounded-xl
          bg-white/50 dark:bg-black/50
          backdrop-blur-xl
          border border-black/10 dark:border-white/10
          shadow-lg shadow-black/10 dark:shadow-black/40
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-6">
          {/* MOBILE MENU BUTTON */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="
              lg:hidden
              p-2 rounded-xl
              hover:bg-black/10 dark:hover:bg-white/10
              text-xl font-bold
            "
          >
            ☰
          </button>

          <h1 className="hidden sm:block text-xl font-bold text-slate-900 dark:text-white">
            XXYYZZ
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-4">
            <NavLinks className="text-base font-medium hover:text-blue-500 transition-colors" />
          </nav>

          <div className="hidden lg:block border-l-2 dark:border-gray-200" />
          <ThemeToggle />

          <Button
            variant="outline"
            className="font-bold rounded-xl text-red-500 hover:bg-red-500/10"
          >
            Log Out
          </Button>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-full w-64
          bg-[#f5f5f5] dark:bg-[#080808]
          border-r border-gray-200 dark:border-white/10
          transform transition-transform duration-300
          lg:hidden flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Menu
          </h2>

          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* MOBILE NAV */}
        <nav className="flex-1 px-6 py-6 space-y-4 text-lg font-semibold text-slate-800 dark:text-slate-200">
          <NavLinks
            className="block hover:text-blue-500 transition-colors"
            onClick={closeMenu}
          />
        </nav>
      </aside>
    </>
  );
};

export default Header;

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface AdminTopBarProps {
  pageTitle: string;
}

const navItems = [
  { href: "/admin", icon: "dashboard", label: "Dashboard" },
  { href: "/admin/projects", icon: "folder_copy", label: "Projects" },
  { href: "/admin/profile", icon: "person", label: "Bio & Profile" },
  { href: "/admin/credentials", icon: "verified", label: "Credentials" },
  { href: "/admin/testimonials", icon: "book_4", label: "My Journal" },
  { href: "/admin/services", icon: "build", label: "Services" },
];

export default function AdminTopBar({ pageTitle }: AdminTopBarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center h-16 px-6 bg-white border-b border-[#EDEDED] sticky top-0 z-40 shrink-0 gap-4 relative">
      {/* Page Title */}
      <h1 className="text-[18px] font-bold text-[#1A1A1A] tracking-tight whitespace-nowrap min-w-[120px]">
        {pageTitle}
      </h1>

      {/* Hamburger Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="ml-auto flex md:hidden items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 text-[#1A1A1A] transition-all"
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-[24px] select-none">
          {isMenuOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Dropdown Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-[#EDEDED] shadow-lg z-50 md:hidden flex flex-col py-2 animate-fade-in">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-6 py-3.5 text-[14px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#FFD600]/10 text-[#1A1A1A] border-l-4 border-[#FFD600] pl-5"
                    : "text-[#6B7280] hover:bg-gray-50 border-l-4 border-transparent pl-5"
                }`}
              >
                <span className="material-symbols-outlined text-[20px] select-none">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

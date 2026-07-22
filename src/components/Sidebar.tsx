"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const navItems = [
  { href: "/admin", icon: "dashboard", label: "Dashboard" },
  { href: "/admin/projects", icon: "folder_copy", label: "Projects" },
  { href: "/admin/profile", icon: "person", label: "Bio & Profile" },
  { href: "/admin/credentials", icon: "verified", label: "Credentials" },
  { href: "/admin/testimonials", icon: "book_4", label: "My Journal" },
  { href: "/admin/services", icon: "build", label: "Services" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const supabase = createClient();
        const { data } = await supabase.from('profile').select('hero_image').single();
        if (data?.hero_image) {
          setProfileImage(data.hero_image);
        }
      } catch {
        // Non-critical: sidebar image fetch failure does not affect auth
      }
    }
    fetchProfile();
  }, []);

  // F-01 FIX: Properly invalidate the Supabase session server-side before redirecting.
  // Previously this was a plain <Link> which never called signOut() — sessions persisted indefinitely.
  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-[220px] sidebar-dot-grid z-50 border-r border-white/10">
      {/* Logo / Brand */}
      <div className="px-5 pt-6 pb-5 flex items-center gap-3 border-b border-white/10">
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FFD600]">
          <img
            src={profileImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuDN5thwa93cesb0qwv6AoS405ld05e3cUd11ubtFuaYxBZHZHorIM5Ntu84dyvT5yZdmPukRhEVGGn6r3RswJjImf2zrqXKMIH0B6hOMhG9VyaX1x-sN6gLfOWDm7lXsVEqpDjvfUmn91Scq3lAkN6p92ypbeavt9Eo8NASJi_2v64JbI_s5WzTUu748_NdTPhKl4CBh2WzfmKny0fcxC-AWLFJANhW4DEo_Zhq_V7S2mKLK1BQ7Q-Z"}
            alt="Admin"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-white font-semibold text-[14px] leading-tight">Portfolio CMS</p>
          <p className="text-white/50 text-[11px] leading-tight">Admin Dashboard</p>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-white/10 text-white border-l-[3px] border-[#FFD600] pl-[9px]"
                      : "text-white/60 hover:bg-white/8 hover:text-white/90 border-l-[3px] border-transparent pl-[9px]"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={
                      isActive
                        ? { fontVariationSettings: "'FILL' 1" }
                        : { fontVariationSettings: "'FILL' 0" }
                    }
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom: Logout */}
      <div className="px-4 pb-6 pt-4 border-t border-white/10 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-white/40 text-[13px] hover:text-white/70 hover:bg-white/8 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Logout
        </button>
      </div>
    </nav>
  );
}

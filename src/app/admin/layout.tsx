"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="text-[#1A1A1A] h-screen flex overflow-hidden bg-[#FFF8EF]">
      <Sidebar />
      {/* Main Content Area — offset by sidebar width */}
      <main className="flex-1 md:ml-[220px] flex flex-col h-full overflow-hidden bg-[#FFF8EF]">
        {children}
      </main>
    </div>
  );
}

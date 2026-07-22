import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import AdminTopBar from "@/components/AdminTopBar";
import AvailabilityToggle from "@/components/AvailabilityToggle";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch basic stats
  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });
  const { count: testimonialCount } = await supabase
    .from("testimonials")
    .select("*", { count: "exact", head: true });

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .limit(1)
    .single();

  const { data: recentLogs } = await supabase
    .from("links")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <>
      <AdminTopBar pageTitle="Dashboard" />

      {/* Scrollable Workspace */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F7F7F7]">
        <div className="max-w-[1100px] mx-auto space-y-6">

          {/* ── Stats Grid ───────────────────────────────────────── */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Published Projects */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-4 sm:p-5 flex flex-col gap-2 sm:gap-3 shadow-subtle">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-[13px] text-[#6B7280] font-medium">Projects</span>
                <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#9CA3AF]" style={{ fontVariationSettings: "'FILL' 0" }}>
                  folder_copy
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] sm:text-[32px] font-bold text-[#1A1A1A] leading-none">{projectCount ?? 0}</span>
                </div>
                <p className="text-[11px] sm:text-[12px] text-[#10B981] font-medium mt-1">Total in database</p>
              </div>
            </div>

            {/* My Journal */}
            <div className="bg-white rounded-xl border border-[#EBEBEB] p-4 sm:p-5 flex flex-col gap-2 sm:gap-3 shadow-subtle">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-[13px] text-[#6B7280] font-medium">My Journal</span>
                <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#9CA3AF]" style={{ fontVariationSettings: "'FILL' 0" }}>
                  book_4
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] sm:text-[32px] font-bold text-[#1A1A1A] leading-none">{testimonialCount ?? 0}</span>
                </div>
                <p className="text-[11px] sm:text-[12px] text-[#6B7280] mt-1">Total in database</p>
              </div>
            </div>

            {/* Availability */}
            <AvailabilityToggle initialStatus={profile?.availability_status ?? 'Open for Work'} />
          </section>

          {/* ── Quick Actions ─────────────────────────────────────── */}
          <section>
            <h2 className="text-[15px] font-bold text-[#1A1A1A] mb-3">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFD600] text-[#1A1A1A] rounded-xl text-[13px] font-semibold hover:bg-[#FFDF33] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add New Project
              </Link>
              <Link
                href="/admin/profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#DCDCDC] text-[#1A1A1A] rounded-xl text-[13px] font-semibold hover:bg-[#F5F5F5] transition-colors shadow-subtle"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Edit Bio
              </Link>
              <Link
                href="/admin/testimonials"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#DCDCDC] text-[#1A1A1A] rounded-xl text-[13px] font-semibold hover:bg-[#F5F5F5] transition-colors shadow-subtle"
              >
                <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
                Add Journal Entry
              </Link>
            </div>
          </section>

          {/* ── Recent Activity ───────────────────────────────────── */}
          <section className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden shadow-subtle">
            <div className="px-6 py-4 border-b border-[#EBEBEB] flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-[#1A1A1A]">Recent Activity</h2>
              <span className="text-xs text-[#9CA3AF]">Last 10 logs</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
                    <th className="px-6 py-3 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider w-16 hidden sm:table-cell">
                      Icon
                    </th>
                    <th className="px-6 sm:px-4 py-3 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider hidden md:table-cell">
                      Date &amp; Time
                    </th>
                    <th className="px-6 py-3 text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider text-right w-24">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {recentLogs && recentLogs.length > 0 ? (
                    recentLogs.map((log) => {
                      let targetUrl = "/admin";
                      if (log.icon?.includes("folder")) targetUrl = "/admin/projects";
                      else if (log.icon?.includes("book")) targetUrl = "/admin/testimonials";
                      else if (log.icon?.includes("build")) targetUrl = "/admin/services";
                      else if (log.icon?.includes("verified")) targetUrl = "/admin/credentials";
                      else if (log.icon?.includes("person") || log.icon?.includes("work")) targetUrl = "/admin/profile";
                      else if (log.title?.toLowerCase().includes("project")) targetUrl = "/admin/projects";
                      else if (log.title?.toLowerCase().includes("journal") || log.title?.toLowerCase().includes("testimonial")) targetUrl = "/admin/testimonials";
                      else if (log.title?.toLowerCase().includes("service")) targetUrl = "/admin/services";
                      else if (log.title?.toLowerCase().includes("credential")) targetUrl = "/admin/credentials";
                      else if (log.title?.toLowerCase().includes("bio") || log.title?.toLowerCase().includes("availability")) targetUrl = "/admin/profile";

                      return (
                        <tr key={log.id} className="hover:bg-[#FAFAFA] transition-colors group">
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <span className="material-symbols-outlined text-[#9CA3AF] text-[20px] select-none">
                              {log.icon || "info"}
                            </span>
                          </td>
                          <td className="px-6 sm:px-4 py-4">
                            <span className="text-[14px] font-medium text-[#1A1A1A]">
                              {log.title}
                            </span>
                            <div className="text-[11px] text-[#9CA3AF] block md:hidden mt-0.5">
                              {new Date(log.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {new Date(log.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-[13px] text-[#6B7280] hidden md:table-cell">
                            {new Date(log.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {new Date(log.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={targetUrl}
                              className="inline-flex items-center px-3 py-1.5 bg-[#F3F4F6] text-[#1A1A1A] hover:bg-[#E5E7EB] rounded-lg text-xs font-semibold transition-all"
                            >
                              Manage
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-[14px] text-[#9CA3AF]">
                        No recent activity logs found. Try performing some actions!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

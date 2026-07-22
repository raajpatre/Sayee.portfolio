import AdminTopBar from "@/components/AdminTopBar";
import TestimonialsManager from "@/components/TestimonialsManager";
import { createClient } from "@/utils/supabase/server";

export default async function TestimonialsPage() {
  const supabase = await createClient();

  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <AdminTopBar pageTitle="My Journal" />

      {/* Scrollable Workspace */}
      <div className="flex-1 overflow-y-auto p-[16px] md:p-[40px] bg-[#F7F7F7]">
        {error ? (
          <div className="max-w-[900px] mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-red-700">
            <p className="font-bold">Database error</p>
            <p className="mt-1 font-mono text-[12px]">{error.message}</p>
          </div>
        ) : (
          <TestimonialsManager initialTestimonials={testimonials || []} />
        )}
      </div>
    </>
  );
}

import AdminTopBar from "@/components/AdminTopBar";
import LinksManager from "@/components/LinksManager";
import { createClient } from "@/utils/supabase/server";

export default async function LinksPage() {
  const supabase = await createClient();

  // Make sure table is "links" and columns match the expected structure
  const { data: links, error } = await supabase
    .from("links")
    .select("id, title, url, icon, created_at")
    .order("created_at", { ascending: false });

  return (
    <>
      <AdminTopBar pageTitle="Blog Links" />

      {/* Scrollable Workspace */}
      <div className="flex-1 overflow-y-auto p-[16px] md:p-[40px] bg-[#F7F7F7]">
        {error ? (
          <div className="w-full max-w-[1200px] mx-auto">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-red-700">
              <p className="font-bold">Database error</p>
              <p className="mt-1 font-mono text-[12px]">{error.message}</p>
              <p className="mt-2 text-[12px] text-red-500">
                Make sure the <code className="bg-red-100 px-1 rounded">links</code> table has columns: <code className="bg-red-100 px-1 rounded">id, title, url, icon, created_at</code>
              </p>
            </div>
          </div>
        ) : (
          <LinksManager initialLinks={links || []} />
        )}
      </div>
    </>
  );
}

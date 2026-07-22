import AdminTopBar from "@/components/AdminTopBar";
import ServicesManager from "@/components/ServicesManager";
import { createClient } from "@/utils/supabase/server";

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services, error } = await supabase
    .from("services")
    .select("id, title, description, icon")
    .order("created_at", { ascending: true });

  return (
    <>
      <AdminTopBar pageTitle="Services" />

      {/* Scrollable Workspace */}
      <div className="flex-1 overflow-y-auto bg-[#F7F7F7]">
        {error ? (
          <div className="p-8 max-w-[1200px] w-full mx-auto">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-red-700">
              <p className="font-bold">Database error</p>
              <p className="mt-1 font-mono text-[12px]">{error.message}</p>
              <p className="mt-2 text-[12px] text-red-500">
                Make sure the <code className="bg-red-100 px-1 rounded">services</code> table has columns: <code className="bg-red-100 px-1 rounded">id, title, description, icon</code>
              </p>
            </div>
          </div>
        ) : (
          <ServicesManager initialServices={services || []} />
        )}
      </div>
    </>
  );
}

import AdminTopBar from "@/components/AdminTopBar";
import CredentialsManager from "@/components/CredentialsManager";
import { createClient } from "@/utils/supabase/server";

export default async function CredentialsPage() {
  const supabase = createClient();

  const { data: credentials, error } = await supabase
    .from("credentials")
    .select("id, type, title, description, url, date")
    .order("created_at", { ascending: true });

  return (
    <>
      <AdminTopBar pageTitle="Credentials" />

      <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F7F7F7]">
        <div className="max-w-[900px] mx-auto">
          {error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-red-700">
              <p className="font-bold">Database error</p>
              <p className="mt-1 font-mono text-[12px]">{error.message}</p>
              <p className="mt-2 text-[12px] text-red-500">
                Make sure the <code className="bg-red-100 px-1 rounded">credentials</code> table has columns: <code className="bg-red-100 px-1 rounded">id, title, institution, year, type</code>
              </p>
            </div>
          ) : (
            <CredentialsManager initialCredentials={credentials ?? []} />
          )}
        </div>
      </div>
    </>
  );
}

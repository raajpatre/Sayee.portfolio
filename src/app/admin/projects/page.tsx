import React from 'react';
import AdminTopBar from "@/components/AdminTopBar";
import ProjectsManager from "@/components/ProjectsManager";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, category, slug, description, cover_image, created_at")
    .order("created_at", { ascending: false });

  return (
    <React.Fragment>
      <AdminTopBar pageTitle="Projects" />

      {/* Scrollable Workspace */}
      <div className="flex-1 overflow-y-auto bg-[#F7F7F7]">
        {error ? (
          <div className="p-8 max-w-[1000px] w-full mx-auto">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-red-700">
              <p className="font-bold">Database error</p>
              <p className="mt-1 font-mono text-[12px]">{error.message}</p>
              <p className="mt-2 text-[12px] text-red-500">
                Make sure the <code className="bg-red-100 px-1 rounded">projects</code> table has the expected columns.
              </p>
            </div>
          </div>
        ) : (
          <ProjectsManager initialProjects={projects || []} />
        )}
      </div>
    </React.Fragment>
  );
}

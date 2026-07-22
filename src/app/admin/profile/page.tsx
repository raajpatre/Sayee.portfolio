import { createClient } from "@/utils/supabase/server";
import AdminTopBar from "@/components/AdminTopBar";
import ProfileForm from "@/components/ProfileForm";
import AvailabilityToggle from "@/components/AvailabilityToggle";

export default async function Page() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from('profile').select('*').limit(1).single();

  return (
    <>
      <AdminTopBar pageTitle="Bio & Profile" />

      {/* Scrollable Workspace */}
      <div className="flex-1 overflow-y-auto p-[16px] md:p-[40px] pb-28 bg-[#F7F7F7]">
        <div className="w-full mx-auto flex justify-center">
          {/* Content Constraints */}
          <div className="w-full max-w-[850px]">
            <ProfileForm initialProfile={profile} />
          </div>
        </div>
      </div>
    </>
  );
}

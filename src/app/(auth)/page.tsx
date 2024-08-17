import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (!user.phone || !user.email) {
    redirect("/auth/create-profile");
  }

  if (!user.user_metadata.role) {
    redirect("/auth/set-profile-type");
  }

  redirect("/search");
}

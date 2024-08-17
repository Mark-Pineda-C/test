import DriverAplicationButton from "@/components/auth/driver-aplication-button";
import SignOut from "@/components/auth/sign-out";
import Avatar from "@/components/profile/avatar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <h1>Search</h1>
      <Avatar userId={user.id} />
      <SignOut />
      <DriverAplicationButton userId={user.id} />
    </div>
  );
}

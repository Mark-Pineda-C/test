import SignOut from "@/components/signout";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div>
      <SignOut />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

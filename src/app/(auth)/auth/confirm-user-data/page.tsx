import ConfirmUserData from "@/components/auth/confirm-user-data";
import { FlagPe4x3, MaterialSymbolsAdd } from "@/components/icons";
import { createClient } from "@/utils/supabase/server";
import { Avatar, Button, Input } from "@nextui-org/react";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <main className="grid min-h-screen bg-background w-full place-items-center px-4">
        <ConfirmUserData user={user!} />
      </main>
    </>
  );
}

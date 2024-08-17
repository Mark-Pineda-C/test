import CreateProfileForm from "@/components/auth/create-profile-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/auth/sign-in");
  }

  return (
    <section className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col gap-10 items-center container">
        <hgroup className="space-y-4">
          <h1 className="text-center text-lg font-bold">Crea tu perfil</h1>
          <p className="text-small text-center">
            Completa tu perfil para continuar
          </p>
        </hgroup>
        <CreateProfileForm user={user} />
      </div>
    </section>
  );
}

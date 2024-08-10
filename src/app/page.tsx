import EmailLogin from "@/components/email-login";
import GoogleLogin from "@/components/google-login";
import PhoneInput from "@/components/phone-input";
import { createClient } from "@/utils/supabase/server";
import { Button, Link } from "@nextui-org/react";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user?.app_metadata.provider === "google") {
    console.log("hay usuario");
    redirect("/user");
  }

  return (
    <main className="grid min-h-screen bg-background w-full place-items-center">
      <div className="flex flex-col items-center gap-6 text-foreground px-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl text-center font-bold">
            Bienvenido a HERCOM
          </h1>
          <p className="text-small text-foreground-500 text-center text-balance">
            Ingresa a tu cuenta
          </p>
        </div>

        <EmailLogin />

        <p className="text-xs text-foreground-500">O inicia sesion con</p>
        <GoogleLogin />
        <p className="text-xs text-foreground-500 text-center">
          Al unirte a nuestra aplicación, aceptas nuestros{" "}
          <Link
            size="sm"
            className="text-xs"
            color="foreground"
            underline="always"
          >
            Términos de Uso
          </Link>{" "}
          y{" "}
          <Link
            size="sm"
            className="text-xs"
            color="foreground"
            underline="always"
          >
            Política de privacidad
          </Link>
        </p>
      </div>
    </main>
  );
}

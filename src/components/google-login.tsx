"use client";

import { Button } from "@nextui-org/react";
import { LogosGoogleIcon } from "./icons";
import { createClient } from "@/utils/supabase/client";

export default function GoogleLogin() {
  const supabase = createClient();
  return (
    <Button
      className="w-full"
      startContent={<LogosGoogleIcon className="text-2xl" />}
      onPress={() =>
        supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: "https://test-seven-ivory-10.vercel.app/user",
          },
        })
      }
    >
      Continuar con Google
    </Button>
  );
}

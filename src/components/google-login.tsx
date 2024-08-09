"use client";

import { Button } from "@nextui-org/react";
import { LogosGoogleIcon } from "./icons";
import { useMutation } from "@tanstack/react-query";
import { signWithGoogle } from "@/utils/actions";

export default function GoogleLogin() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["google-sign-in"],
    mutationFn: signWithGoogle,
  });
  return (
    <Button
      className="w-full"
      startContent={<LogosGoogleIcon className="text-2xl" />}
      onPress={() => mutate()}
      isLoading={isPending}
    >
      Continuar con Google
    </Button>
  );
}

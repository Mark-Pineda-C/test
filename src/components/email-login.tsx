"use client";

import { signWithEmail } from "@/utils/actions";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";

export default function EmailLogin() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["email-login"],
    mutationFn: signWithEmail,
  });
  return (
    <form className="flex items-center flex-col gap-6 w-full" action={mutate}>
      <Input type="text" name="email" label="Correo" />
      <Input type="password" name="password" label="Contraseña" />
      <Button
        type="submit"
        color="primary"
        className="w-full"
        isLoading={isPending}
      >
        Ingresar
      </Button>
    </form>
  );
}

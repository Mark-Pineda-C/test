"use client";

import { verifyOtp } from "@/utils/actions";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";

export default function ValidateOtp({ phone }: { phone: string }) {
  const { mutate, isPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: verifyOtp,
  });

  return (
    <form className="flex items-center flex-col gap-6 w-full" action={mutate}>
      <input type="hidden" name="phone" value={phone} />
      <Input name="otp" placeholder="Ingresa el código enviado" />
      <Button
        type="submit"
        color="primary"
        className="w-full"
        isLoading={isPending}
      >
        Validar
      </Button>
    </form>
  );
}

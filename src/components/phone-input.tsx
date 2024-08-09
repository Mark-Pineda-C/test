"use client";

import { Button, Input } from "@nextui-org/react";
import { FlagPe4x3 } from "./icons";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { sendOtp } from "@/utils/actions";

export default function PhoneInput() {
  const supabase = createClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["otp-send"],
    mutationFn: sendOtp,
  });
  return (
    <form className="flex items-center flex-col gap-6 w-full" action={mutate}>
      <Input
        type="number"
        name="phone"
        placeholder="Número de teléfono"
        startContent={
          <span className="flex items-center gap-1">
            <FlagPe4x3 className="text-xl rounded-md" /> <span>+51</span>
          </span>
        }
      />
      <Button
        type="submit"
        color="primary"
        className="w-full"
        isLoading={isPending}
      >
        Enviar código
      </Button>
    </form>
  );
}

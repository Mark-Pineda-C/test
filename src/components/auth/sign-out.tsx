"use client";

import { signOut } from "@/utils/actions/auth";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";

export default function SignOut() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-out"],
    mutationFn: signOut,
  });
  return (
    <Button onPress={() => mutate()} isLoading={isPending}>
      Salir
    </Button>
  );
}

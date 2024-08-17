"use client";

import { GoogleIcon, GoogleLoading } from "@/components/icons";
import { GoogleSignIn } from "@/utils/actions/auth";
import { Button, Divider, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";

export default function Page() {
  const {
    mutate: signWithGoogle,
    isPending: googleLoading,
    isSuccess: googleSuccess,
  } = useMutation({
    mutationKey: ["google-sign-in"],
    mutationFn: GoogleSignIn,
  });

  return (
    <section className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col gap-10 items-center container">
        <hgroup className="space-y-4">
          <h1 className="text-center text-lg font-bold">Bienvenido a -APP-</h1>
          <p className="text-small text-center">
            Ingresa a tu número de teléfono para ingresar
          </p>
        </hgroup>
        <form action="" className="w-full space-y-4">
          <Input placeholder="Número de Teléfono" name="email" />
          <Button color="primary" className="w-full h-12">
            INGRESAR
          </Button>
        </form>
        <div className="relative w-full">
          <Divider />
          <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-10 bg-app-background text-center">
            ó
          </span>
        </div>
        <Button
          className="w-full h-12"
          onPress={() => signWithGoogle()}
          isDisabled={googleLoading}
          startContent={
            googleLoading || googleSuccess ? (
              <GoogleLoading className="text-xl" />
            ) : (
              <GoogleIcon className="text-xl" />
            )
          }
        >
          Ingresa con Google
        </Button>
      </div>
    </section>
  );
}

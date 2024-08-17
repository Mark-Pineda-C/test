"use client";

import { setProfileType } from "@/utils/actions/auth";
import { Button, Image } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Page() {
  const { mutate: setPassenger, isPending: passengerPending } = useMutation({
    mutationKey: ["set-profile-passenger"],
    mutationFn: setProfileType,
    onSettled: (data) => {
      if (data!.type === "error") {
        toast.error(data!.message);
      }
    },
  });
  const { mutate: setDriver, isPending: driverPending } = useMutation({
    mutationKey: ["set-profile-driver"],
    mutationFn: setProfileType,
    onSettled: (data) => {
      if (data!.type === "error") {
        toast.error(data!.message);
      }
    },
  });

  return (
    <section className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col gap-10 items-center container">
        <hgroup className="space-y-2">
          <h1 className="text-center text-lg font-bold">
            ¿Eres pasajero o conductor?
          </h1>
          <p className="text-small text-center">
            puedes cambiar la modalidad despues
          </p>
        </hgroup>
        <div className="flex flex-col items-center gap-4 w-3/4">
          <form action={setPassenger} className="w-full">
            <input type="hidden" name="role" value="passenger" />
            <Button
              type="submit"
              className="w-full"
              isLoading={passengerPending}
            >
              Pasajero
            </Button>
          </form>
          <form action={setDriver} className="w-full">
            <input type="hidden" name="role" value="driver" />
            <Button type="submit" className="w-full" isLoading={driverPending}>
              Conductor
            </Button>
          </form>
        </div>
      </div>
      <Image
        removeWrapper
        className="absolute -bottom-4 w-full aspect-video h-auto z-10"
        src="/conductor.svg"
        alt=""
      />
    </section>
  );
}

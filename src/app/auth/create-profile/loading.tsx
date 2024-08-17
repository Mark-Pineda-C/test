import { Button, Input, Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <section className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col gap-10 items-center container">
        <hgroup className="space-y-4">
          <h1 className="text-center text-lg font-bold">Crea tu perfil</h1>
          <p className="text-small text-center">
            Completa tu perfil para continuar
          </p>
        </hgroup>
        <div className="w-full flex flex-col items-center gap-4">
          <Skeleton className="w-32 h-32 rounded-full mb-4" />
          <Skeleton className="w-full rounded-lg">
            <Input placeholder="Nombre" name="name" />
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <Input placeholder="Correo electrónico" name="email" />
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <Input placeholder="Número de Teléfono" name="phone" />
          </Skeleton>
          <Button color="primary" className="w-full h-12" isDisabled>
            CONTINUAR
          </Button>
        </div>
      </div>
    </section>
  );
}

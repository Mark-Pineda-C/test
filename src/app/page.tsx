import { UimGoogle } from "@/components/icons";
import { Button, Input, Link } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid min-h-screen bg-background w-full place-items-center">
      <div className="flex flex-col items-center gap-6 text-foreground px-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl text-center font-bold">
            Introduce tu número de teléfono
          </h1>
          <p className="text-small text-foreground-500 text-center text-balance">
            Te enviaremos un código para verificar tu número telefónico
          </p>
        </div>
        <Input placeholder="Numero de telefono" type="number" />
        <Button color="primary" className="w-full">
          Enviar código
        </Button>
        <p className="text-xs text-foreground-500">O inicia sesion con</p>
        <Button
          className="w-full"
          startContent={<UimGoogle className="text-2xl" />}
        >
          Continuar con Google
        </Button>
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

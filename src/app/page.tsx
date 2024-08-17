import { Button, Link } from "@nextui-org/react";

export default function Page() {
  return (
    <main className="grid place-items-center h-screen w-full">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">HERCOM App</h1>
        <Button as={Link} href="/auth">
          Ingresar
        </Button>
      </div>
    </main>
  );
}

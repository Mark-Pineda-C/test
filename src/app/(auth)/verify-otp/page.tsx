import ValidateOtp from "@/components/validate-otp";

export default function Page({
  searchParams: { phone },
}: {
  searchParams: { phone: string };
}) {
  return (
    <main className="grid min-h-screen bg-background w-full place-items-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-xl font-bold">validación de código</h1>
        <p className="text-xs text-foreground-500">
          Ingresa el código que enviamos al numero{" "}
          <b className="text-foreground">+{phone}</b>
        </p>
        <ValidateOtp phone={phone} />
      </div>
    </main>
  );
}

import { MdiSeatPassenger, PhSteeringWheel } from "@/components/icons";
import { Card, CardBody } from "@nextui-org/react";

export default function Page() {
  return (
    <main className="grid min-h-screen bg-background w-full place-items-center">
      <div className="flex flex-col items-center gap-6 text-foreground">
        <h1 className="text-xl font-bold">¿Como piensas usar la aplicacion?</h1>
        <div className="grid grid-cols-2 gap-10">
          <Card isPressable>
            <CardBody className="flex flex-col items-center">
              <MdiSeatPassenger className="text-7xl" />
              <p>Pasajero</p>
            </CardBody>
          </Card>
          <Card isPressable>
            <CardBody className="flex flex-col items-center">
              <PhSteeringWheel className="text-7xl" />
              <p>Chofer</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}

"use client";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, Plus, Warning } from "../icons";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const getTitle = (step: number) => {
  switch (step) {
    case 1:
      return "Información personal";
    case 2:
      return "Documentos personales";
    case 3:
      return "Información del vehículo";
    case 4:
      return "Paso 4";
    default:
      return "Aplicar a conductor";
  }
};

export default function DriverAplicationForm() {
  const [[step, direction], setStep] = useState([0, 0]);
  const [brevete, setBrevete] = useState("digital");

  const naivgate = (newDirection: number) => {
    setStep([Math.min(Math.max(step + newDirection, 1), 4), newDirection]);
  };

  return (
    <ModalContent>
      <ModalHeader>{getTitle(step)}</ModalHeader>
      <ModalBody className="relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full h-full absolute left-0 px-6"
          >
            {step === 0 && (
              <div className="w-full h-full grid place-items-center">
                <div className="flex flex-col items-center gap-4">
                  <Warning className="text-[6rem] text-foreground-400" />
                  <h1 className="text-lg text-center font-semibold">
                    Antes de empezar
                  </h1>
                  <p className="text-center">
                    Necesitamos que completes tu perfil de conductor
                  </p>
                  <Button onPress={() => naivgate(1)}>Continuar</Button>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="w-full h-full flex flex-col gap-4 items-start">
                <div className="grid grid-cols-3 w-full gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <Card
                      isPressable
                      className="aspect-[12/9] bg-foreground-100 w-full"
                      shadow="none"
                    >
                      <CardBody className="grid place-items-center">
                        <Plus className="text-2xl" />
                      </CardBody>
                    </Card>
                    <span className="text-xs text-foreground-400">
                      Foto de perfil
                    </span>
                  </div>
                </div>
                <Input label="Nombres" />
                <Input label="Apellidos" />
                <Input label="Fecha de nacimiento" />
              </div>
            )}
            {step === 2 && (
              <div className="w-full h-full flex flex-col gap-4 items-start">
                <div className="grid grid-cols-3 w-full gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <Card
                      isPressable
                      className="aspect-[12/9] bg-foreground-100 w-full"
                      shadow="none"
                    >
                      <CardBody className="grid place-items-center">
                        <Plus className="text-2xl" />
                      </CardBody>
                    </Card>
                    <span className="text-xs text-foreground-400 text-center">
                      Documento de identidad
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Card
                      isPressable
                      className="aspect-[12/9] bg-foreground-100 w-full"
                      shadow="none"
                    >
                      <CardBody className="grid place-items-center">
                        <Plus className="text-2xl" />
                      </CardBody>
                    </Card>
                    <span className="text-xs text-foreground-400 text-center">
                      Reverso del documento de identidad
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Card
                      isPressable
                      className="aspect-[12/9] bg-foreground-100 w-full"
                      shadow="none"
                    >
                      <CardBody className="grid place-items-center">
                        <Plus className="text-2xl" />
                      </CardBody>
                    </Card>
                    <span className="text-xs text-foreground-400 text-center">
                      Selfie con tu documento de identidad
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Card
                      isPressable
                      className="aspect-[12/9] bg-foreground-100 w-full"
                      shadow="none"
                    >
                      <CardBody className="grid place-items-center">
                        <Plus className="text-2xl" />
                      </CardBody>
                    </Card>
                    <span className="text-xs text-foreground-400 text-center">
                      Antecedentes policiales
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Card
                      isPressable
                      className="aspect-[12/9] bg-foreground-100 w-full"
                      shadow="none"
                    >
                      <CardBody className="grid place-items-center">
                        <Plus className="text-2xl" />
                      </CardBody>
                    </Card>
                    <span className="text-xs text-foreground-400 text-center">
                      Antecedentes penales
                    </span>
                  </div>
                  <div className="col-span-full">
                    <RadioGroup
                      label="Tipo de brevete"
                      color="primary"
                      orientation="horizontal"
                      value={brevete}
                      onValueChange={setBrevete}
                    >
                      <Radio value="digital">Digital</Radio>
                      <Radio value="fisico">Fisico</Radio>
                    </RadioGroup>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Card
                      isPressable
                      className="aspect-[12/9] bg-foreground-100 w-full"
                      shadow="none"
                    >
                      <CardBody className="grid place-items-center">
                        <Plus className="text-2xl" />
                      </CardBody>
                    </Card>
                    <span className="text-xs text-foreground-400 text-center">
                      Brevete
                    </span>
                  </div>
                  {brevete === "fisico" && (
                    <>
                      <div className="flex flex-col items-center gap-1">
                        <Card
                          isPressable
                          className="aspect-[12/9] bg-foreground-100 w-full"
                          shadow="none"
                        >
                          <CardBody className="grid place-items-center">
                            <Plus className="text-2xl" />
                          </CardBody>
                        </Card>
                        <span className="text-xs text-foreground-400 text-center">
                          Reverso del brevete
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Card
                          isPressable
                          className="aspect-[12/9] bg-foreground-100 w-full"
                          shadow="none"
                        >
                          <CardBody className="grid place-items-center">
                            <Plus className="text-2xl" />
                          </CardBody>
                        </Card>
                        <span className="text-xs text-foreground-400 text-center">
                          Selfie con el brevete
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <Input label="Número de la licencia de conducir" />
                <Input label="Fecha de vencimiento de la licencia de conducir" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </ModalBody>
      <ModalFooter
        className={`!grid grid-cols-5 gap-2 w-full items-center duration-200 ${
          step === 0 ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col gap-2 col-span-2">
          <span className="font-bold">{step} de 4</span>
          <Progress value={step * 25} size="sm" />
        </div>
        <div className="col-span-1">
          <Button
            isIconOnly
            className="w-full"
            onPress={() => naivgate(-1)}
            isDisabled={step === 1}
          >
            <ChevronLeft className="text-2xl" />
          </Button>
        </div>
        <div className="col-span-2">
          <Button
            color="primary"
            className="w-full"
            onPress={() => naivgate(1)}
          >
            {step === 4 ? "Finalizar" : "Siguiente"}
          </Button>
        </div>
      </ModalFooter>
    </ModalContent>
  );
}

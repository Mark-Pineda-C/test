"use client";

import { ChevronLeft } from "@/components/icons";
import { Button, Progress } from "@nextui-org/react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const [step, setStep] = useState(1);
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-between p-4">
      <div>
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex flex-col gap-4 items-center"
            >
              <h1 className="text-center text-lg font-bold">Paso 1</h1>
              <p className="text-small text-center">
                Completa tu perfil para continuar
              </p>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex flex-col gap-4 items-center"
            >
              <h1 className="text-center text-lg font-bold">Paso 2</h1>
              <p className="text-small text-center">
                Completa tu perfil para continuar
              </p>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex flex-col gap-4 items-center"
            >
              <h1 className="text-center text-lg font-bold">Paso 3</h1>
              <p className="text-small text-center">
                Completa tu perfil para continuar
              </p>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex flex-col gap-4 items-center"
            >
              <h1 className="text-center text-lg font-bold">Paso 4</h1>
              <p className="text-small text-center">
                Completa tu perfil para continuar
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full grid grid-cols-5 items-center gap-2">
        <div className="flex flex-col gap-2 col-span-2">
          <span className="font-bold">{step} de 4</span>
          <Progress value={step * 25} />
        </div>
        <div className="col-span-1">
          <Button
            isIconOnly
            className="w-full"
            onPress={() => setStep((prev) => Math.max(prev - 1, 1))}
            isDisabled={step === 1}
          >
            <ChevronLeft className="text-2xl" />
          </Button>
        </div>
        <div className="col-span-2">
          <Button
            color="primary"
            className="w-full"
            onPress={() => setStep((prev) => Math.min(prev + 1, 4))}
          >
            {step === 4 ? "Finalizar" : "Siguiente"}
          </Button>
        </div>
      </div>
    </section>
  );
}

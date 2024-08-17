"use client";

import { createClient } from "@/utils/supabase/client";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { ApplicationForm } from "../icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import DriverAplicationForm from "./driver-aplication-form";

export default function DriverAplicationButton({ userId }: { userId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, isLoading } = useQuery({
    queryKey: ["set-driver-aplication"],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("driver_profile")
        .select("aplication_form")
        .eq("account_id", userId)
        .single();

      if (error) {
        return null;
      }

      return data;
    },
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (!data?.aplication_form.sended) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <AnimatePresence>
      {isLoading && <></>}
      {data?.aplication_form.sended ? (
        <></>
      ) : (
        <>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
            <DriverAplicationForm />
          </Modal>
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: { type: "spring", damping: "30" },
            }}
            exit={{
              scale: 0,
              transition: { type: "spring", damping: "30" },
            }}
            className="absolute z-40 bottom-10 left-5"
          >
            <Button
              onPress={onOpen}
              isIconOnly
              color="primary"
              radius="full"
              size="lg"
            >
              <ApplicationForm className="text-2xl" />
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

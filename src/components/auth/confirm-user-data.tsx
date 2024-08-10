"use client";

import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import { MaterialSymbolsAdd, FlagPe4x3 } from "../icons";
import { useMutation } from "@tanstack/react-query";
import { sendOtp, verifyOtp } from "@/utils/actions";

export default function ConfirmUserData({ user }: { user: User }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    mutate: sendOtpAction,
    data: sendOtpData,
    isPending: sendOtpIsPending,
  } = useMutation({
    mutationKey: ["send-otp", user.id],
    mutationFn: sendOtp,
    onSuccess: onOpen,
  });

  const { mutate: verifyOtpAction, isPending: verifyOtpIsPending } =
    useMutation({
      mutationKey: ["verify-otp", user.id],
      mutationFn: verifyOtp,
      onSuccess: onClose,
    });

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="text-foreground">
          <ModalHeader>Verifica tu codigo</ModalHeader>
          <ModalBody
            as="form"
            className="flex flex-col items-center"
            action={verifyOtpAction}
          >
            <p className="text-small">
              Escribe el codigo de 6 digitos que hemos enviado al numero{" "}
              <b>+51{sendOtpData?.phone}</b>
            </p>
            <input type="hidden" name="name" value={sendOtpData?.name!} />
            <input type="hidden" name="phone" value={sendOtpData?.phone!} />
            <Input name="token" placeholder="ingresa tu codigo aqui" />
            <Button
              color="primary"
              type="submit"
              isLoading={verifyOtpIsPending}
            >
              Verificar
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <form
        className="flex flex-col items-center gap-10 text-foreground w-full"
        action={sendOtpAction}
      >
        <h1 className="text-center text-xl font-bold">Confirma tus datos</h1>
        <div className="relative">
          <Avatar
            src={user?.user_metadata.avatar_url}
            className="h-32 w-32 text-2xl"
            name={user?.user_metadata.full_name}
          />
          <div className="bg-background p-1 rounded-full grid place-items-center absolute z-[5] bottom-0 right-0">
            <Button
              color="primary"
              variant="solid"
              radius="full"
              isIconOnly
              size="sm"
            >
              <MaterialSymbolsAdd className="text-2xl text-background" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 w-full">
          <Input
            label="Nombre"
            name="name"
            defaultValue={user?.user_metadata.name}
          />
          <Input
            label="Correo"
            name="email"
            defaultValue={user?.user_metadata.email}
            isDisabled
          />
          <Input
            type="number"
            name="phone"
            placeholder="Número de teléfono"
            startContent={
              <span className="flex items-center gap-1">
                <FlagPe4x3 className="text-xl rounded-md" /> <span>+51</span>
              </span>
            }
          />
        </div>
        <Button
          type="submit"
          color="primary"
          className="w-full"
          isLoading={sendOtpIsPending}
        >
          Validar Numero
        </Button>
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      </form>
    </>
  );
}

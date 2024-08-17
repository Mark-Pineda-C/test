"use client";

import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import type { User } from "@supabase/supabase-js";
import { AddPhotoIcon, FlagIcon } from "../icons";
import { useMutation } from "@tanstack/react-query";
import { createProfile, verifyOtp } from "@/utils/actions/auth";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { countryList } from "./country-list";
import { redirect } from "next/navigation";

export default function CreateProfileForm({ user }: { user: User }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const {
  //   mutate: sendOtp,
  //   isPending: sendPending,
  //   data: sendData,
  // } = useMutation({
  //   mutationKey: ["create-profile", user.id],
  //   mutationFn: createProfile,
  //   onSettled: (data) => {
  //     if (data?.type === "error") {
  //       toast.error(data.message);
  //     }
  //     if (data?.type === "success") {
  //       onOpen();
  //     }
  //   },
  // });
  const {
    mutate: createProfileAction,
    isPending: createPending,
    data: createData,
  } = useMutation({
    mutationKey: ["create-profile", user.id],
    mutationFn: createProfile,
    onSuccess: (data) => {
      if (data?.type === "error") {
        toast.error(data.message);
      }
      if (data?.type === "success") {
        toast.success("Perfil creado correctamente");
      }
    },
  });

  const { mutate: verifyOtpAction, isPending: verifyPending } = useMutation({
    mutationKey: ["verify-otp", user.id],
    mutationFn: verifyOtp,
    onSettled: (data) => {
      if (data?.type === "error") {
        toast.error(data.message);
      }
      if (data?.type === "success") {
        redirect("/set-profile-type");
      }
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent as="form" action={verifyOtpAction} className="w-full">
          <ModalHeader>
            Verificar {!user.email && "Correo"} {!user.phone && "Teléfono"}
          </ModalHeader>
          <ModalBody className="flex flex-col items-center gap-4">
            <p className="text-center">
              Hemos enviado un código de 6 digitos al
              {createData?.returns === "email" && (
                <>
                  correo <b>{createData?.message}</b>
                </>
              )}
              {createData?.returns === "phone" && (
                <>
                  numero <b>+{createData?.message}</b>
                </>
              )}
            </p>
            <input type="hidden" name="validator" value={createData?.message} />
            <input type="hidden" name="returns" value={createData?.returns} />
            <Input
              label="Código de verificacion"
              placeholder="000000"
              name="token"
              className="w-full"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              className="w-full h-12"
              isLoading={verifyPending}
            >
              Validar código
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <form
        action={createProfileAction}
        className="w-full flex flex-col items-center gap-4"
      >
        <input type="hidden" name="has-phone" value={user.phone ? 1 : 0} />
        <input type="hidden" name="has-email" value={user.email ? 1 : 0} />
        <div className="relative">
          <Avatar
            showFallback
            src={user?.user_metadata.avatar_url}
            className="w-32 h-32 mb-4"
          />
          <Button
            color="primary"
            className="absolute bottom-3 right-3 outline outline-white dark:outline-[#0d1a27]"
            radius="full"
            size="sm"
            isIconOnly
          >
            <AddPhotoIcon className="text-lg" />
          </Button>
        </div>
        <Input
          placeholder="Nombre"
          name="name"
          defaultValue={user?.user_metadata.name}
        />
        <Input
          placeholder="Correo electrónico"
          name="email"
          defaultValue={user?.email}
          isDisabled={!!user?.email}
        />
        <div className="flex items-center gap-4 w-full">
          <Select
            name="phone-code"
            className="w-20"
            defaultSelectedKeys={["+51"]}
            items={countryList}
            renderValue={(items) => {
              return items.map((item) => (
                <FlagIcon
                  country={item.data?.code!}
                  key={item.key}
                  className="text-xl"
                />
              ));
            }}
          >
            {(item) => (
              <SelectItem key={item.code} value={item.code}>
                <FlagIcon country={item.code!} className="text-xl" />
              </SelectItem>
            )}
          </Select>
          <Input
            className="flex-1"
            placeholder="Número de Teléfono"
            name="phone"
            type="tel"
            defaultValue={user?.phone}
            isDisabled={!!user?.phone}
          />
        </div>
        <Button
          type="submit"
          color="primary"
          className="w-full h-12"
          isLoading={createPending}
        >
          Validar {!user.email && "Correo"} {!user.phone && "Teléfono"}
        </Button>
      </form>
    </>
  );
}

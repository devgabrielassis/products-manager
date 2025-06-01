"use client";
import FormRegister from "@/components/Forms/FormRegister";
import { BackIcon } from "@/components/Icons/BackIcon";
import ModalRegisterSuccess from "@/components/Modals/ModalRegisterSuccess";
import { Button, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <main className="min-h-screen content-center">
      <div className="bg-black border max-w-[88vw] p-6 md:max-w-auto md:p-8 rounded-xl w-fit mx-auto">
        <Button
          onPress={goBack}
          color="default"
          startContent={<BackIcon />}
          variant="bordered"
        >
          Volar
        </Button>
        <h2 className="text-center font-bold text-xl text-white mb-2">
          Cadastre-se
        </h2>
        <FormRegister onOpen={onOpen} />
        <ModalRegisterSuccess isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </main>
  );
}

'use client'
import FormRegister from "@/components/Forms/FormRegister";
import ModalRegisterSuccess from "@/components/Modals/ModalRegisterSuccess";
import { useDisclosure } from "@heroui/react";
import React from "react";

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <main className="min-h-screen content-center">
      <div className="bg-black border max-w-[88vw] p-6 md:max-w-auto md:p-8 rounded-xl w-fit mx-auto">
        <h2 className="text-center font-bold text-xl text-white mb-2">
          Cadastre-se
        </h2>
        <FormRegister onOpen={onOpen} />
        <ModalRegisterSuccess
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
    </div>
    </main>
  );
}

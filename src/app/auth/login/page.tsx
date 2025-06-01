"use client";
import FormLogin from "@/components/Forms/FormLogin";
import { BackIcon } from "@/components/Icons/BackIcon";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <main className="min-h-screen content-center">
      <div className="bg-black border min-w-[24vw] max-w-[88vw] p-6 md:max-w-auto md:p-8 rounded-xl w-fit mx-auto">
        <Button
          onPress={goBack}
          color="default"
          startContent={<BackIcon />}
          variant="bordered"
        >
          Volar
        </Button>
        <h2 className="text-center font-bold text-xl text-white mb-2">
          Faça Login
        </h2>
        <FormLogin />
      </div>
    </main>
  );
}

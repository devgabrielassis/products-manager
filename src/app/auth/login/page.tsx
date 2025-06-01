import FormLogin from "@/components/Forms/FormLogin";
import React from "react";

export default function page() {
  return (
    <main className="min-h-screen content-center">
      <div className="bg-black border max-w-[88vw] p-6 md:max-w-auto md:p-8 rounded-xl w-fit mx-auto">
        <h2 className="text-center font-bold text-xl text-white mb-2">
          Faça Login
        </h2>
        <FormLogin />
      </div>
    </main>
  );
}

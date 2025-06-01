'use client'
import { Button } from "@heroui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex items-center">
      <div className="border max-w-[88vw] p-6 md:max-3-xl md:p-8 mx-auto bg-black/80 rounded-xl">
        <h3 className="font-bold text-white mb-2">
          Bem-vindo ao Products Manager!
        </h3>
        <Link href={'/auth/login'}>
          <Button className="w-full" color="secondary">
            Fazer Login
          </Button>
        </Link>
        <Link href={'/auth/cadastro'}>
          <Button className="w-full mt-2" color="secondary" variant="bordered">
            Cadastre-se
          </Button>
        </Link>
      </div>
    </main>
  );
}

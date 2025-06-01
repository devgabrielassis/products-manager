"use client";
import React from "react";
import { Form, Input, Button, addToast } from "@heroui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Por favor, digite seu e-mail")
    .email("Digite um e-mail válido"),
  password: z.string().min(1, "Digite sua senha"),
});

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", data);
      const token = response.data.token;
      Cookies.set("product-manager-token", token, { expires: 9999 });
      addToast({
        title: "Sucesso!",
        description: response.data.message,
        color: "success",
      });
      reset();
      router.push("/dashboard/");
    } catch (error: any) {
      const parsed = JSON.parse(error?.request?.response);
      addToast({
        title: "Atenção!",
        description: parsed.message,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-4 max-w-md">
        <Input
          label="E-mail"
          labelPlacement="outside"
          placeholder="Digite seu e-mail"
          type="email"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Senha"
          labelPlacement="outside"
          placeholder="Digite sua senha"
          type="password"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register("password")}
        />

        <Button
          isLoading={isLoading}
          className="w-full"
          color="secondary"
          type="submit"
        >
          Entrar
        </Button>
      </div>
    </Form>
  );
}

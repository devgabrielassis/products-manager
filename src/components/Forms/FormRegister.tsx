"use client";
import React from "react";
import { Form, Input, Select, SelectItem, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/services/axios";
import Cookies from "js-cookie";

const schema = z
  .object({
    name: z
      .string()
      .min(1, "Por favor, digite seu nome")
      .refine((val) => val !== "admin", {
        message: "Boa tentativa! Escolha outro nome de usuário",
      }),
    email: z
      .string()
      .min(1, "Por favor, digite seu e-mail")
      .email("Digite um e-mail válido"),
    password: z
      .string()
      .min(4, "A senha deve ter pelo menos 4 caracteres")
      .refine((val) => /[A-Z]/.test(val), {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .refine((val) => /[^a-zA-Z0-9]/.test(val), {
        message: "A senha deve conter pelo menos um símbolo",
      }),
    verifyPassword: z.string(),
    phone: z.object({
      country: z.string().min(1, "Selecione o país"),
      ddd: z.string().min(2, "DDD obrigatório"),
      number: z.string().min(8, "Número de telefone obrigatório"),
    }),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "As senhas não coincidem",
    path: ["verifyPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function FormRegister({
  onOpen,
}: {
  onOpen: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      console.log(data);
      const response = await api.post("/users", data);
      const token = response.data.token;
      Cookies.set("product-manager-token" as any, token, {
        expires: 9999,
      });
      reset();
      onOpen(true);
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
    setIsLoading(false);
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => {
        reset();
      }}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          label="Nome"
          labelPlacement="outside"
          placeholder="Digite seu nome"
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          {...register("name")}
        />

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

        <Input
          label="Confirmar senha"
          labelPlacement="outside"
          placeholder="Repita sua senha"
          type="password"
          isInvalid={!!errors.verifyPassword}
          errorMessage={errors.verifyPassword?.message}
          {...register("verifyPassword")}
        />

        <Select
          label="País"
          labelPlacement="outside"
          isInvalid={!!errors.phone?.country}
          errorMessage={errors.phone?.country?.message}
          {...register("phone.country")}
        >
          <SelectItem className="text-white" key="55">
            Brasil
          </SelectItem>
          <SelectItem className="text-white" key="us">
            Estados Unidos
          </SelectItem>
          <SelectItem className="text-white" key="1">
            Canadá
          </SelectItem>
          <SelectItem className="text-white" key="7">
            Rússia
          </SelectItem>
        </Select>

        <div className="flex gap-4">
          <Input
            label="DDD"
            labelPlacement="outside"
            placeholder="Ex: 11"
            isInvalid={!!errors.phone?.ddd}
            errorMessage={errors.phone?.ddd?.message}
            {...register("phone.ddd")}
          />
          <Input
            label="Telefone"
            labelPlacement="outside"
            placeholder="Ex: 912345678"
            maxLength={9}
            isInvalid={!!errors.phone?.number}
            errorMessage={errors.phone?.number?.message}
            {...register("phone.number")}
          />
        </div>

        <div className="flex gap-4">
          <Button
            isLoading={isLoading}
            className="w-full"
            color="secondary"
            type="submit"
          >
            Enviar
          </Button>
        </div>
      </div>
    </Form>
  );
}

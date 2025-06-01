"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  addToast,
} from "@heroui/react";
import React, { useEffect } from "react";
import { api } from "@/services/axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { mutate } from "swr";
import { PlusIcon } from "../Icons/PlusIcon";

const productSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  thumbnail:
    typeof File !== "undefined"
      ? z
          .instanceof(File)
          .refine((file) => file.size > 0, "A thumbnail é obrigatória")
      : z
          .string()
          .refine((value) => value.length > 0, "A thumbnail é obrigatória"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductCreate() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: undefined,
    },
  });

  const thumbnail = watch("thumbnail");

  useEffect(() => {
    if (thumbnail) {
      console.log("Thumbnail selecionada:", thumbnail);
    }
  }, [thumbnail]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("thumbnail", data.thumbnail);

      const response = await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      addToast({
        title: "Sucesso!",
        description: response.data.message,
        color: "success",
      });
      reset({
        title: "",
        description: "",
        thumbnail: undefined,
      });
      mutate((key) => typeof key === "string" && key.startsWith("/products"));
      onOpenChange();
    } catch (err) {
      console.error("Erro ao criar produto", err);
    }
  };

  return (
    <>
      <Button color="secondary" onPress={onOpen} endContent={<PlusIcon />}>
        Adicionar Produto
      </Button>
      <Modal
        scrollBehavior="outside"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="text-white">
          {(onClose) => (
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <ModalHeader className="flex flex-col gap-1">
                Adicionar Produto
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <Input
                  label="Título do produto"
                  placeholder="Digite o nome do produto"
                  variant="bordered"
                  {...register("title")}
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                />
                <Textarea
                  label="Descrição do produto"
                  placeholder="Digite a descrição do produto"
                  variant="bordered"
                  {...register("description")}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
                <div>
                  <p className="text-sm text-gray-400">Thumbnail:</p>
                  <Input
                    label="Thumbnail"
                    type="file"
                    onChange={(e) =>
                      reset({
                        ...watch(),
                        thumbnail: e.target.files?.[0],
                      })
                    }
                  />
                  {errors.thumbnail && (
                    <p className="text-red-500 text-sm">
                      {errors.thumbnail.message as string}
                    </p>
                  )}
                  {thumbnail instanceof File && (
                    <div
                      style={{
                        backgroundImage: `url(${URL.createObjectURL(
                          thumbnail
                        )})`,
                      }}
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="secondary"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Salvar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

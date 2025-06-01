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
  Switch,
  addToast,
} from "@heroui/react";
import { EditIcon } from "../Icons/EditIcon";
import React, { useEffect } from "react";
import { api } from "@/services/axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { mutate } from "swr";

// Zod schema
const productSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  status: z.boolean(),
  thumbnail: z
    .any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      "A thumbnail deve ser um arquivo válido"
    ),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductEdit({ product }: { product: any }) {
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
      title: product?.title,
      description: product?.description,
      status: product?.status,
      thumbnail: undefined,
    },
  });

  const { thumbnail } = watch();

  useEffect(() => {
    console.log(thumbnail);
  }, [thumbnail]);

  useEffect(() => {
    if (product) {
      console.log(product);
      reset({
        title: product.title,
        description: product.description,
        status: product.status,
        thumbnail: undefined,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      await api.put(`/products/${product.id}`, {
        title: data.title,
        description: data.description,
        status: data.status,
      });

      if (data.thumbnail && data.thumbnail instanceof File) {
        const formData = new FormData();
        formData.append("thumbnail", data.thumbnail);
        await api.patch(`/products/thumbnail/${product.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      addToast({
        title: "Sucesso!",
        description: "Produto atualizado com sucesso.",
        color: "success",
      });
      mutate((key) => typeof key === "string" && key.startsWith("/products"));
      mutate(`/products/${product.id}`);
      onOpenChange();
    } catch (err) {
      console.error("Erro ao atualizar produto", err);
    }
  };

  const handleOpen = () => {
    reset();
    onOpen();
  };

  return (
    <>
      <EditIcon onClick={handleOpen} className="cursor-pointer" />
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
                Editar Produto
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <div>
                  <Input
                    label="Título do produto"
                    placeholder="Digite o nome do produto"
                    variant="bordered"
                    {...register("title")}
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                  />
                </div>
                <div>
                  <Textarea
                    label="Descrição do produto"
                    placeholder="Digite a descrição do produto"
                    variant="bordered"
                    {...register("description")}
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <span>Status:</span>
                  <Switch
                    {...register("status")}
                    isSelected={watch("status")}
                    onValueChange={(val) => {
                      reset({ ...watch(), status: val });
                    }}
                    size="sm"
                  />
                </div>
                <p className="text-sm mt-4 text-gray-400">Thumbnail:</p>
                <div
                  style={{
                    backgroundImage: thumbnail
                      ? `url(${URL.createObjectURL(thumbnail)})`
                      : `url(${product.thumbnail.url})`,
                  }}
                  className="h-64 relative flex flex-col bg-cover bg-center bg-no-repeat gap-2 mb-6"
                >
                  <div className="absolute bottom-0 w-full translate-y-6">
                    <Input
                      label="Nova Thumbnail"
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
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit" isLoading={isSubmitting}>
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

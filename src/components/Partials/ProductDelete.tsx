"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { api } from "@/services/axios";
import { mutate } from "swr";
import { DeleteIcon } from "../Icons/DeleteIcon";
import React from "react";

export default function ProductDelete({ product }: { product: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleOpen = () => {
    onOpen();
  };

  const deleteProduct = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.delete(`/products/${product.id}`);
      addToast({
        title: "Sucesso!",
        description: response.data.message,
        color: "success",
      });
      onOpenChange();
      mutate((key) => typeof key === "string" && key.startsWith("/products"));
    } catch (error: any) {
      addToast({
        title: "Atenção!",
        description: error.response.data.message,
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DeleteIcon onClick={handleOpen} className="cursor-pointer" />
      <Modal
        scrollBehavior="outside"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="text-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Deletar Produto
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <p>
                  Você tem certeza que deseja deletar o produto:
                  <b> {product.title}</b>?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="secondary"
                  type="submit"
                  onPress={deleteProduct}
                  isLoading={isSubmitting}
                >
                  Deletar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

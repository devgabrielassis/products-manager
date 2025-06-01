import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link,
} from "@heroui/react";

export default function ModalRegisterSuccess({
  isOpen,
  onOpenChange,
}: any) {
  return (
    <>
      <Modal
        className="dark text-white"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tudo pronto!
              </ModalHeader>
              <ModalBody>
                <p>
                  Sua conta foi criada com sucesso e agora você tem acesso total
                  ao nosso sistema de gerenciamento de produtos. Vá para o
                  dashboard para começar a cadastrar, editar e organizar seus
                  produtos com facilidade.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="bordered" onPress={onClose}>
                  Fechar
                </Button>
                <Link href={"/dashboard/"}>
                  <Button color="secondary" onPress={onClose}>
                    Ir para Dashboard
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

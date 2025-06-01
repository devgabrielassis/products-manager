import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
  Divider,
  Chip,
} from "@heroui/react";
import { EyeIcon } from "../Icons/EyeIcon";
import { BarChart } from "./BarChart";

const statusColorMap: any = {
  true: "success",
  false: "danger",
};

export default function ProductView({ product }: { product: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <EyeIcon onClick={onOpen} />
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
              <ModalHeader className="flex flex-col items-center text-center gap-2">
                {product.title}
                <Chip
                  className="capitalize"
                  color={statusColorMap[product.status]}
                  size="sm"
                  variant="flat"
                  >
                  {product.status ? "Ativo" : "Inativo"}
                </Chip>
              </ModalHeader>
              <ModalBody className="-mt-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={product.thumbnail.url}
                />
                <p className="text-center">{product.description}</p>
                <BarChart />
              </ModalBody>
              <Divider />
              <ModalFooter>
                <Button color="secondary" onPress={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

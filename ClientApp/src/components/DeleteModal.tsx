import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "./ui";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface DeleteModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    item: string;
    onDelete: () => void;
}

export function DeleteModal({ isOpen, setIsOpen, item, onDelete }: DeleteModalProps) {
    function handleDelete() {
        onDelete();
        setIsOpen(false);
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalHeader>Delete {item}</ModalHeader>
            <ModalBody>
                <p className="text-white text-md">
                    Are you sure you want to delete {item}?
                </p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button color="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export function DeleteButton({ item, onDelete }: { item: string; onDelete: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Button color="none" onClick={() => setIsOpen(true)}>
                <DeleteOutlineOutlinedIcon />
            </Button>
            <DeleteModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                item={item}
                onDelete={onDelete}
            />
        </>
    );
}

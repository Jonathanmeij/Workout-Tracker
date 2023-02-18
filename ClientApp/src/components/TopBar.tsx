import { Button, Divider } from "./ui";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DeleteButton } from "./DeleteModal";

export default function TopBar({
    title,
    to,
    children,
    setEditIsOpen,
    deleteFunction,
    deleteItem,
}: {
    title: string;
    to: string;
    children?: React.ReactNode;
    setEditIsOpen?: (isOpen: boolean) => void;
    deleteFunction?: () => void;
    deleteItem?: string;
}) {
    return (
        <>
            <div className="flex items-center">
                <Button to={to}>
                    <ArrowBackIosNewOutlinedIcon />
                </Button>
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    <div>
                        {deleteFunction && deleteItem && (
                            <DeleteButton item={deleteItem} onDelete={deleteFunction} />
                        )}
                        {setEditIsOpen && (
                            <Button onClick={() => setEditIsOpen(true)}>
                                <EditOutlinedIcon />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <Divider />
        </>
    );
}

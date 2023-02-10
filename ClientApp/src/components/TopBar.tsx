import { Button, Divider } from "./ui";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function TopBar({
    title,
    to,
    children,
    editFunction,
}: {
    title: string;
    to: string;
    children?: React.ReactNode;
    editFunction?: () => void;
}) {
    return (
        <>
            <div className="flex items-center">
                <Button to={to}>
                    <ArrowBackIosNewOutlinedIcon />
                </Button>
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    {editFunction && (
                        <Button onClick={editFunction}>
                            <EditOutlinedIcon />
                        </Button>
                    )}
                </div>
            </div>
            <Divider />
        </>
    );
}

import { Button, Divider } from "./ui";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

export default function TopBar({
    title,
    to,
    children,
}: {
    title: string;
    to: string;
    children?: React.ReactNode;
}) {
    return (
        <>
            <div className="flex items-center">
                <Button to={to}>
                    <ArrowBackIosNewOutlinedIcon />
                </Button>
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    {children}
                </div>
            </div>
            <Divider />
        </>
    );
}

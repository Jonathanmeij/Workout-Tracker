import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Box from "../Box";
import Divider from "../Divider";
import IconButton from "../IconButton";

interface DrawerHeaderProps {
    title: string;
    onClose: () => void;
}

export default function DrawerHeader({ title, onClose }: DrawerHeaderProps) {
    return (
        <>
            <Box className="flex items-center justify-between">
                <h2 className=" text-xl font-semibold">{title}</h2>
                <IconButton onClick={onClose}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Box>
            <Divider />
        </>
    );
}

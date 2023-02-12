import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Button } from "../../components/ui";
import Divider from "../ui/Divider";

export default function MobileNavbar() {
    return (
        <>
            <div className="fixed bottom-0 left-0 w-full h-20 bg-gray-800">
                <Divider />

                <div className="flex flex-row items-center justify-around h-full p-2 pb-4">
                    <Button to="/" color="none" className="text-white">
                        <HomeOutlinedIcon fontSize="large" />
                    </Button>
                    <Button to="/account" color="none" className="text-white ">
                        <AccountCircleOutlinedIcon fontSize="large" />
                    </Button>
                </div>
            </div>
        </>
    );
}

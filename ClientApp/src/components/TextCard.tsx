import { Card, Box } from "./ui";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

function WorkoutCard({ children }: { children: React.ReactNode }) {
    return (
        <Card className="w-full max-w-lg">
            <Box className="flex justify-between w-full gap-4">
                <h2 className="text-lg font-medium ">{children}</h2>
                <ArrowForwardIosOutlinedIcon />
            </Box>
        </Card>
    );
}

export default WorkoutCard;

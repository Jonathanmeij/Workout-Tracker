import { Card, Box } from "./ui";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

function WorkoutCard({ children }: { children: React.ReactNode }) {
    return (
        <Card className="w-full max-w-lg">
            <Box className="flex items-center justify-between w-full gap-4">
                {children}
                <ArrowForwardIosOutlinedIcon />
            </Box>
        </Card>
    );
}

export default WorkoutCard;

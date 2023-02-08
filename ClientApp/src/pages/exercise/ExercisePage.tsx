import TopBar from "../../components/TopBar";
import { Box, Button, Card, Container } from "../../components/ui";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useParams } from "react-router-dom";
import TitledList from "../../components/TitledList";
import TextCard from "../../components/TextCard";

export default function ExercisePage() {
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const { id } = useParams<{ id: string }>();

    return (
        <div className="max-w-lg mx-auto">
            <Container>
                <div className="flex flex-col gap-3 my-4">
                    <TopBar to={"/workout/" + id} title={"Exercise " + exerciseId}>
                        <Button>
                            <EditOutlinedIcon />
                        </Button>
                    </TopBar>
                    <Card className="w-full max-w-lg">
                        <Box className="flex flex-col justify-center w-full gap-4">
                            <h2 className="text-xl font-semibold ">Exercise name</h2>
                            <p className="text-sm">Graph here</p>
                        </Box>
                    </Card>
                    <TitledList title="Sessions" hasAddButton={false}>
                        {sessions.map((session) => (
                            <SessionTextCard key={session.id} session={session} />
                        ))}
                    </TitledList>
                </div>
            </Container>
        </div>
    );
}

interface Session {
    id: number;
    name: string;
}

function SessionTextCard({ session }: { session: Session }) {
    return (
        <Card className="w-full max-w-lg">
            <Box className="flex items-center justify-between w-full gap-4">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-400">Weight</p>
                    <h3>
                        <span className="text-lg ">5 kg</span> x{" "}
                        <span className="text-lg ">10 kg</span>
                    </h3>
                </div>
                <h2 className="font-medium text-blue-400 text-md">{session.name}</h2>
            </Box>
        </Card>
    );
}

const sessions = [
    {
        id: 1,
        name: "17 januari 2021",
    },
    {
        id: 2,
        name: "18 januari 2021",
    },
    {
        id: 3,
        name: "19 januari 2021",
    },
];

import TopBar from "../../components/TopBar";
import { Button, Container } from "../../components/ui";
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
                    <TitledList title="Sets" hasAddButton={false}>
                        {sessions.map((session) => (
                            <TextCard key={session.id}>{session.name}</TextCard>
                        ))}
                    </TitledList>
                </div>
            </Container>
        </div>
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

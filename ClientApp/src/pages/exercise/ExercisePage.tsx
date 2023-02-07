import TopBar from "../../components/TopBar";
import { Button, Container } from "../../components/ui";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useParams } from "react-router-dom";

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
                </div>
            </Container>
        </div>
    );
}

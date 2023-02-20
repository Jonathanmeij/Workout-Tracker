import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { DeleteModal } from "../../components/DeleteModal";
import TopBar from "../../components/TopBar";
import { Box, Card, Container } from "../../components/ui";
import { dateToString } from "../../services/DateTimeConverter";
import { deleteSession, getWorkouts } from "../../services/workoutsFetch";

export default function SessionPage() {
    const navigate = useNavigate();
    const authHeader = useAuthHeader();

    const { id } = useParams<{ id: string }>();
    const idInt = id ? parseInt(id) : 0;
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const exerciseIdInt = exerciseId ? parseInt(exerciseId) : 0;
    const { sessionId } = useParams<{ sessionId: string }>();
    const sessionIdInt = sessionId ? parseInt(sessionId) : 0;
    const [isOpen, setIsOpen] = useState(false);

    const query = useQuery("workouts", () => getWorkouts(authHeader()));

    const deleteMutation = useMutation((data: any) => deleteSession(data, authHeader()), {
        onSuccess: () => {
            query.refetch();
        },
    });

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    if (query.isError) {
        return <div>Error</div>;
    }

    const workouts = query.data?.data;
    const workout = workouts.find((w) => w.id === idInt);
    const exercise = workout?.exercises.find((e) => e.id === exerciseIdInt);
    const session = exercise?.sessions.find((s) => s.id === sessionIdInt);

    const date = dateToString(session?.date);

    function onDelete() {
        deleteMutation.mutate(sessionIdInt);
        navigate(`/workout/${idInt}/exercise/${exerciseIdInt}`);
    }

    return (
        <div className="max-w-lg mx-auto">
            <Container>
                <div className="flex flex-col gap-3 my-4">
                    <TopBar
                        deleteFunction={onDelete}
                        deleteItem={"session"}
                        title="Session"
                        to=""
                        onClick={() => navigate(-1)}
                    />
                </div>
                <Card className="w-full max-w-lg">
                    <Box className="flex flex-col justify-center w-full gap-3">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-gray-300 ">Date</h3>
                            <p className="text-lg font-medium">{date}</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-gray-300 ">Weight</h3>
                                <p className="text-lg font-medium">{session?.weight}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-gray-300 ">Reps</h3>
                                <p className="text-lg font-medium">{session?.reps}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-gray-300 ">Sets</h3>
                                <p className="text-lg font-medium">{session?.sets}</p>
                            </div>
                        </div>
                    </Box>
                </Card>
            </Container>
        </div>
    );
}

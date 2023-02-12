import TopBar from "../../components/TopBar";
import { Box, Button, Card, Container, Divider, Input } from "../../components/ui";
import { useParams } from "react-router-dom";
import TitledList from "../../components/TitledList";
import { useMutation, useQuery } from "react-query";
import { getWorkouts } from "../../services/workoutsFetch";
import { useAuthHeader } from "react-auth-kit";
import { dateToString } from "../../services/DateTimeConverter";
import { useForm } from "react-hook-form";
import { postSession } from "../../services/workoutsFetch";
import EmptyList from "../../components/EmptyList";

export default function ExercisePage() {
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const { id } = useParams<{ id: string }>();
    const authHeader = useAuthHeader();

    const editFunction = () => {
        console.log("Edit");
    };

    const query = useQuery("workouts", () => getWorkouts(authHeader()));

    const mutation = useMutation((data: any) => postSession(data, authHeader()), {
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
    const workout = workouts.find((w) => w.id === parseInt(id!));
    const exercise = workout?.exercises.find((e) => e.id === parseInt(exerciseId!));
    const sessions = exercise?.sessions ?? [];

    return (
        <div className="max-w-lg mx-auto">
            <Container>
                <div className="flex flex-col gap-3 my-4">
                    <TopBar
                        to={"/workout/" + id}
                        title={"Exercise " + exerciseId}
                        editFunction={editFunction}
                    />
                    <Card className="w-full max-w-lg">
                        <Box className="flex flex-col justify-center w-full gap-4">
                            <h2 className="text-xl font-semibold ">Exercise name</h2>
                            <p className="text-sm">Graph here</p>
                        </Box>
                    </Card>
                    <TitledList title="Sessions" hasAddButton={false}>
                        <SessionAddCard mutation={mutation} exerciseId={exerciseId!} />

                        {sessions.length === 0 ? (
                            <EmptyList item="session" />
                        ) : (
                            <>
                                <Divider />
                                {sessions.map((session) => (
                                    <SessionTextCard key={session.id} session={session} />
                                ))}
                            </>
                        )}
                    </TitledList>
                </div>
            </Container>
        </div>
    );
}

interface Session {
    id: number;
    name: string;
    weight: number;
    reps: number;
    sets: number;
    date: string;
}

function SessionTextCard({ session }: { session: Session }) {
    return (
        <Card className="w-full max-w-lg">
            <div className="flex items-center justify-between w-full gap-4 p-3">
                <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-400">Weight</p>
                    <h3>
                        <span className="">{session?.weight} kg</span> x{" "}
                        <span className="">{session?.reps}</span>
                        <span className="ml-3 text-lg text-gray-100">
                            {session?.sets} sets
                        </span>
                    </h3>
                </div>
                <h2 className="font-medium text-blue-400">
                    {dateToString(session.date)}
                </h2>
            </div>
        </Card>
    );
}

function SessionAddCard({ mutation, exerciseId }: { mutation: any; exerciseId: string }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const sessionData = {
            weight: data.weight,
            reps: data.reps,
            sets: data.sets,
            exerciseId: parseInt(exerciseId),
        };
        mutation.mutate(sessionData);
    };

    return (
        <Card className="w-full max-w-lg">
            <Box className="flex items-center justify-between w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-medium">Add session</h3>

                        <div className="flex gap-2">
                            <Input
                                type="number"
                                register={register}
                                name="weight"
                                placeholder="Weight"
                                fullWidth
                                error={errors.weight?.message?.toString()}
                                options={{
                                    required: {
                                        value: true,
                                    },
                                }}
                            />
                            <Input
                                type="number"
                                register={register}
                                name="reps"
                                placeholder="Reps"
                                fullWidth
                                error={errors.reps?.message?.toString()}
                                options={{
                                    required: {
                                        value: true,
                                    },
                                }}
                            />

                            <Input
                                type="number"
                                register={register}
                                name="sets"
                                placeholder="Sets"
                                fullWidth
                                error={errors.sets?.message?.toString()}
                                options={{
                                    required: {
                                        value: true,
                                    },
                                }}
                            />
                        </div>
                        <Button
                            fullWidth
                            color={"primary"}
                            type="submit"
                            className="mt-2"
                        >
                            Add
                        </Button>
                    </div>
                </form>
            </Box>
        </Card>
    );
}

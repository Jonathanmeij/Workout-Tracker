import TopBar from "../../components/TopBar";
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "../../components/ui";
import { Link, useNavigate, useParams } from "react-router-dom";
import TitledList from "../../components/TitledList";
import { useMutation, useQuery } from "react-query";
import { deleteExercise, getWorkouts, putExercise } from "../../services/workoutsFetch";
import { useAuthHeader } from "react-auth-kit";
import { dateToString } from "../../services/DateTimeConverter";
import { useForm } from "react-hook-form";
import { postSession } from "../../services/workoutsFetch";
import EmptyList from "../../components/EmptyList";
import { useState } from "react";
import TextCard from "../../components/TextCard";
import Chart from "./Chart";

export default function ExercisePage() {
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const { id } = useParams<{ id: string }>();
    const authHeader = useAuthHeader();
    const navigate = useNavigate();
    const [editIsOpen, setEditIsOpen] = useState(false);

    const query = useQuery("workouts", () => getWorkouts(authHeader()));

    const mutation = useMutation((data: any) => postSession(data, authHeader()), {
        onSuccess: () => {
            query.refetch();
        },
    });

    const deleteMutation = useMutation(
        (data: any) => deleteExercise(data, authHeader()),
        {
            onSuccess: () => {
                query.refetch();
            },
        }
    );

    const editMutation = useMutation((data: any) => putExercise(data, authHeader()), {
        onSuccess: () => {
            query.refetch();
        },
    });

    function deleteFunction() {
        navigate("/workout/" + id);
        deleteMutation.mutate(exerciseId);
        console.log("Delete");
    }

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

    const chartData = sessions.map((session) => {
        return {
            name: dateToString(session.date),
            value: session.weight,
        };
    });

    return (
        <div className="max-w-lg mx-auto">
            <Container>
                <div className="flex flex-col gap-3 my-4">
                    <TopBar
                        to={"/workout/" + id}
                        title={exercise?.name ?? "Exercise"}
                        setEditIsOpen={setEditIsOpen}
                        deleteFunction={deleteFunction}
                        deleteItem={exercise?.name}
                    />
                    <Card className="w-full max-w-lg">
                        <Box className="flex flex-col justify-center w-full h-64 gap-4">
                            <h2 className="text-xl font-semibold ">Chart</h2>
                            <Chart data={chartData.reverse()} />
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
                                    <Link
                                        key={session.id}
                                        to={
                                            "/workout/" +
                                            id +
                                            "/exercise/" +
                                            exerciseId +
                                            "/session/" +
                                            session.id
                                        }
                                    >
                                        <SessionTextCard session={session} />
                                    </Link>
                                ))}
                            </>
                        )}
                    </TitledList>
                </div>
            </Container>
            <EditExerciseModal
                isOpen={editIsOpen}
                setIsOpen={setEditIsOpen}
                mutations={editMutation}
                exercise={exercise}
            />
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
        <TextCard>
            <div className="flex items-center justify-between w-full gap-4">
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
        </TextCard>
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
        console.log(sessionData);

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

type Exercise = {
    id: number;
    name: string;
};

function EditExerciseModal({
    isOpen,
    setIsOpen,
    exercise,
    mutations,
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    exercise: Exercise;
    mutations: any;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const editFunction = (data) => {
        const exerciseData = {
            id: exercise.id,
            name: data.name,
        };
        console.log(exerciseData);
        mutations.mutate(exerciseData);
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <form>
                <ModalHeader>Edit Exercise</ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        register={register}
                        defaultValue={exercise.name}
                        name="name"
                        placeholder="Name"
                        fullWidth
                        error={errors.name?.message?.toString()}
                        options={{
                            required: {
                                value: true,
                            },
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        onClick={() => setIsOpen(false)}
                        className="mr-2"
                    >
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSubmit(editFunction)}>
                        Save
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}

// unction EditWorkoutModal({
//     isOpen,
//     setIsOpen,
//     workout,
//     mutations,
// }: {
//     isOpen: boolean;
//     setIsOpen: (value: boolean) => void;
//     workout: Workout;
//     mutations: any;
// }) {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();

//     const editFunction = (data) => {
//         const workoutData = {
//             id: workout.id,
//             name: data.name,
//         };
//         console.log(workoutData);

//         mutations.mutate(workoutData);
//         setIsOpen(false);
//     };

//     return (
//         <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
//             <form>
//                 <ModalHeader>Edit Workout</ModalHeader>
//                 <ModalBody>
//                     <Input
//                         name="name"
//                         placeholder={"Workout Name"}
//                         error={errors.name?.message?.toString()}
//                         register={register}
//                         fullWidth
//                         defaultValue={workout.name}
//                         options={{
//                             required: {
//                                 value: true,
//                                 message: "Workout name is required",
//                             },
//                         }}
//                     />
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button
//                         type="button"
//                         color="secondary"
//                         onClick={() => setIsOpen(false)}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         onClick={handleSubmit(editFunction)}
//                         type="submit"
//                         color="primary"
//                         padding="normal"
//                     >
//                         Save
//                     </Button>
//                 </ModalFooter>
//             </form>
//         </Modal>
//     );
// }

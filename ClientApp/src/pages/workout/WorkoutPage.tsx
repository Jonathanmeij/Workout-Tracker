import TopBar from "../../components/TopBar";
import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Input,
} from "../../components/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import TitledList from "../../components/TitledList";
import { useMutation, useQuery } from "react-query";
import { getWorkouts } from "../../services/workoutsFetch";
import { useAuthHeader } from "react-auth-kit";
import EmptyList from "../../components/EmptyList";
import TextCard from "../../components/TextCard";
import {
    deleteWorkout,
    postExercise,
    putExercise,
    putWorkout,
} from "../../services/workoutsFetch";

export default function WorkoutPage() {
    const [isOpen, setisOpen] = useState(false);
    const { id } = useParams<{ id: string }>();
    const idInt = id ? parseInt(id) : 0;
    const authHeader = useAuthHeader();
    const navigate = useNavigate();
    const [editIsOpen, setEditIsOpen] = useState(false);

    const editFunction = () => {
        console.log("Edit");
    };

    const query = useQuery("workouts", () => getWorkouts(authHeader()));

    const mutations = useMutation((data: any) => postExercise(data, authHeader()), {
        onSuccess: () => {
            query.refetch();
        },
    });

    const mutations2 = useMutation((data: any) => deleteWorkout(data, authHeader()), {
        onSuccess: () => {
            query.refetch();
        },
    });

    const mutations3 = useMutation((data: any) => putWorkout(data, authHeader()), {
        onSuccess: () => {
            query.refetch();
        },
    });

    function onDelete() {
        navigate("/");
        mutations2.mutate(idInt);
        console.log("Delete");
    }

    const workout = query.data?.data.find((workout) => workout.id === idInt);
    const exercises = workout?.exercises;

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    if (query.isError) {
        return <div>Error</div>;
    }

    return (
        <div className="max-w-lg mx-auto">
            <Container>
                <div className="flex flex-col gap-3 my-4">
                    <TopBar
                        deleteFunction={onDelete}
                        deleteItem={workout?.name}
                        to="/"
                        title={workout.name}
                        setEditIsOpen={setEditIsOpen}
                    />
                    <TitledList hasAddButton title="Exercises" setisOpen={setisOpen}>
                        {exercises.length === 0 ? (
                            <EmptyList item="exercise" setIsOpen={setisOpen} />
                        ) : (
                            exercises.map((exercise) => (
                                <Link
                                    key={exercise.id}
                                    to={`/workout/${id}/exercise/${exercise.id}`}
                                >
                                    <TextCard>
                                        <h2 className="text-lg font-medium">
                                            {exercise.name}
                                        </h2>
                                    </TextCard>
                                </Link>
                            ))
                        )}
                    </TitledList>
                </div>
            </Container>
            <AddExerciseButton
                mutations={mutations}
                isOpen={isOpen}
                setisOpen={setisOpen}
                id={idInt}
            />
            <EditWorkoutModal
                workout={workout}
                isOpen={editIsOpen}
                setIsOpen={setEditIsOpen}
                mutations={mutations3}
            />
        </div>
    );
}

function AddExerciseButton({
    isOpen,
    setisOpen,
    mutations,
    id,
}: {
    isOpen: boolean;
    setisOpen: (value: boolean) => void;
    mutations: any;
    id: number;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const exercisedata = {
            name: data.name,
            workoutId: id,
        };
        mutations.mutate(exercisedata);
        setisOpen(false);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setisOpen}>
            <form>
                <ModalHeader>Add Exercise</ModalHeader>
                <ModalBody>
                    <Input
                        register={register}
                        name="name"
                        placeholder="Exercise Name"
                        error={errors.name?.message?.toString()}
                        options={{
                            required: {
                                value: true,
                                message: "Exercise name is required",
                            },
                        }}
                        fullWidth
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="secondary"
                        onClick={() => setisOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        padding="normal"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Add
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}

type Workout = {
    id: number;
    name: string;
    exercises: Exercise[];
};

type Exercise = {
    id: number;
    name: string;
};

function EditWorkoutModal({
    isOpen,
    setIsOpen,
    workout,
    mutations,
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    workout: Workout;
    mutations: any;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const editFunction = (data) => {
        const workoutData = {
            id: workout.id,
            name: data.name,
        };
        console.log(workoutData);
        mutations.mutate(workoutData);
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <form>
                <ModalHeader>Edit Workout</ModalHeader>
                <ModalBody>
                    <Input
                        name="name"
                        placeholder={"Workout Name"}
                        error={errors.name?.message?.toString()}
                        register={register}
                        fullWidth
                        defaultValue={workout.name}
                        options={{
                            required: {
                                value: true,
                                message: "Workout name is required",
                            },
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        color="secondary"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit(editFunction)}
                        type="submit"
                        color="primary"
                        padding="normal"
                    >
                        Save
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}
// type Exercise = {
//     id: number;
//     name: string;
// };

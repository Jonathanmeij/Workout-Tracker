import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useForm } from "react-hook-form";
import TitledList from "../../components/TitledList";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "../../components/ui";
import { useQuery, useMutation } from "react-query";
import EmptyList from "../../components/EmptyList";
import { Link } from "react-router-dom";
import TextCard from "../../components/TextCard";
import { getWorkouts, postWorkout } from "../../services/workoutsFetch";

export default function WorkoutCardContainer() {
    const [isOpen, setIsOpen] = useState(false);
    const authHeader = useAuthHeader();

    const query = useQuery("workouts", () => getWorkouts(authHeader()));

    const mutations = useMutation((data: any) => postWorkout(data, authHeader()), {
        onSuccess: () => {
            query.refetch();
        },
    });

    const workouts = query.data?.data;

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    if (query.isError) {
        return <div>Error</div>;
    }

    return (
        <>
            <AddWorkoutModal
                mutations={mutations}
                isOpen={isOpen}
                setisOpen={setIsOpen}
            />
            <TitledList hasAddButton title="Workouts" setisOpen={setIsOpen}>
                {workouts.length === 0 ? (
                    <EmptyList item="workout" setIsOpen={setIsOpen} />
                ) : (
                    workouts.map((workout) => (
                        <Link key={workout.id} to={`/workout/${workout.id}`}>
                            <TextCard>
                                <h2 className="text-lg font-medium">{workout.name}</h2>
                            </TextCard>
                        </Link>
                    ))
                )}
            </TitledList>
        </>
    );
}

function AddWorkoutModal({
    isOpen,
    setisOpen,
    mutations,
}: {
    isOpen: boolean;
    setisOpen: (value: boolean) => void;
    mutations: any;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        mutations.mutate(data);
        setisOpen(false);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setisOpen}>
            <form>
                <ModalHeader>Add Workout</ModalHeader>
                <ModalBody>
                    <Input
                        register={register}
                        name="name"
                        placeholder="Workout Name"
                        error={errors.name?.message?.toString()}
                        options={{
                            required: {
                                value: true,
                                message: "Name is required",
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

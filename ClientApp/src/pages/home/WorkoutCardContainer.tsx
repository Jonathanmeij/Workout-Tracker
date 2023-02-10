import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import EmptyList from "../../components/EmptyList";
import TextCard from "../../components/TextCard";
import TitledList from "../../components/TitledList";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "../../components/ui";

export default function WorkoutCardContainer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <AddWorkoutModal isOpen={isOpen} setisOpen={setIsOpen} />
            <TitledList hasAddButton title="Workouts" setisOpen={setIsOpen}>
                {/* {workouts.length === 0 ? (
                    <EmptyList item="workout" setIsOpen={setIsOpen} />
                ) : (
                    workouts.map((workout) => (
                        <Link key={workout.id} to={`/workout/${workout.id}`}>
                            <TextCard>{workout.name}</TextCard>
                        </Link>
                    ))
                )} */}
            </TitledList>
        </>
    );
}

function AddWorkoutModal({
    isOpen,
    setisOpen,
}: {
    isOpen: boolean;
    setisOpen: (value: boolean) => void;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

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

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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import TextCard from "../../components/TextCard";
import TitledList from "../../components/TitledList";
import EmptyList from "../../components/EmptyList";

export default function WorkoutPage() {
    const [isOpen, setisOpen] = useState(false);
    const { id } = useParams<{ id: string }>();

    const editFunction = () => {
        console.log("Edit");
    };

    return (
        <div className="max-w-lg mx-auto">
            <Container>
                <div className="flex flex-col gap-3 my-4">
                    <TopBar to="/" title="Workout name" editFunction={editFunction} />
                    <TitledList hasAddButton title="Exercises" setisOpen={setisOpen}>
                        {/* {exercises.length === 0 ? (
                            <EmptyList item="exercise" setIsOpen={setisOpen} />
                        ) : (
                            exercises.map((exercise) => (
                                <Link
                                    key={exercise.id}
                                    to={`/workout/${id}/${exercise.id}`}
                                >
                                    <TextCard>{exercise.name}</TextCard>
                                </Link>
                            ))
                        )} */}
                    </TitledList>
                </div>
            </Container>
            <AddExerciseButton isOpen={isOpen} setisOpen={setisOpen} />
        </div>
    );
}

function AddExerciseButton({
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

type Exercise = {
    id: number;
    name: string;
};

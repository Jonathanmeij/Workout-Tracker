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
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import TextCard from "../../components/TextCard";

export default function WorkoutPage() {
    const [isOpen, setisOpen] = useState(false);
    const { id } = useParams<{ id: string }>();

    return (
        <div className="max-w-lg mx-auto">
            <Container>
                <div className="flex flex-col gap-3 my-4">
                    <TopBar to="/" title="Workout name">
                        <Button>
                            <EditOutlinedIcon />
                        </Button>
                    </TopBar>
                    <div className="flex items-center justify-between w-full py-1">
                        <h2 className="text-xl font-semibold ">Workouts</h2>
                        <Button padding="none" onClick={() => setisOpen(true)}>
                            <AddOutlinedIcon htmlColor="#2563eb" fontSize="large" />
                        </Button>
                    </div>
                    <div className="flex flex-col gap-3">
                        {exercises.map((exercise) => (
                            <Link key={exercise.id} to={`/workout/${id}/${exercise.id}`}>
                                <TextCard>{exercise.name}</TextCard>
                            </Link>
                        ))}
                    </div>
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

const exercises = [
    {
        id: 1,
        name: "Bench Press",
    },
    {
        id: 2,
        name: "Incline Bench Press",
    },
    {
        id: 3,
        name: "Tricep Pushdown",
    },
];

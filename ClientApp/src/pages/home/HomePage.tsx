import {
    Container,
    Card,
    Box,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    ModalFooter,
} from "../../components/ui";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Divider from "../../components/ui/Divider";
import TextCard from "../../components/TextCard";

export default function Home() {
    const ingelogd = true;

    return (
        <div className="max-w-lg mx-auto">
            {ingelogd ? <HomeIngelogd /> : <HomeNietIngelogd />}
        </div>
    );
}

function HomeNietIngelogd() {
    return (
        <div>
            <Container className="flex flex-col items-center justify-center h-screen">
                <Card className="w-full max-w-lg">
                    <Box className="flex flex-col items-center justify-center w-full gap-4">
                        <h1 className="text-2xl font-semibold ">WorkoutTracker</h1>
                        <Button to="/login" color="primary" fullWidth>
                            Login
                        </Button>
                        <Button to="/register" color="secondary" fullWidth>
                            Register
                        </Button>
                    </Box>
                </Card>
            </Container>
        </div>
    );
}

function HomeIngelogd() {
    return (
        <div>
            <Container className="">
                <div className="flex flex-col gap-3 my-4">
                    <h1 className="text-md">
                        welcome back, <br />
                        <span className="text-2xl font-semibold text-blue-600">
                            Username
                        </span>
                    </h1>
                    <Divider />
                    <Card className="w-full max-w-lg">
                        <Box className="flex flex-col justify-center w-full gap-4">
                            <h2 className="text-xl font-semibold ">Statistics</h2>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row justify-between">
                                    <p>Workouts</p>
                                    <p>0</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p>Workouts</p>
                                    <p>0</p>
                                </div>
                            </div>
                        </Box>
                    </Card>
                    <WorkoutCardContainer />
                </div>
            </Container>
        </div>
    );
}

function WorkoutCardContainer() {
    const [isOpen, setisOpen] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between w-full py-1">
                <h2 className="text-xl font-semibold ">Workouts</h2>
                <Button padding="none" onClick={() => setisOpen(true)}>
                    <AddOutlinedIcon htmlColor="#2563eb" fontSize="large" />
                </Button>
            </div>
            <div className="flex flex-col gap-3">
                {workouts.map((workout) => (
                    <Link key={workout.id} to={`/workout/${workout.id}`}>
                        <TextCard>{workout.name}</TextCard>
                    </Link>
                ))}
            </div>

            <AddWorkoutModal isOpen={isOpen} setisOpen={setisOpen} />
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

const workouts = [
    {
        name: "push 1",
        id: 1,
    },
    {
        name: "pull 1",
        id: 2,
    },
    {
        name: "legs 1",
        id: 3,
    },
];

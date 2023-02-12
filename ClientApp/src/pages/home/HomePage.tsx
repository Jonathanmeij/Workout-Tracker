import { Container, Card, Box, Button } from "../../components/ui";
import Divider from "../../components/ui/Divider";
import WorkoutCardContainer from "./WorkoutCardContainer";
import { useAuthUser } from "react-auth-kit";

export default function Home() {
    const ingelogd = useAuthUser();

    return (
        <div className="max-w-lg mx-auto">
            {ingelogd() ? <HomeIngelogd /> : <HomeNietIngelogd />}
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
    const auth = useAuthUser();
    const Username = auth()!.email.split("@")[0];

    return (
        <div>
            <Container className="">
                <div className="flex flex-col gap-3 my-4">
                    <h1 className="text-md">
                        welcome back, <br />
                        <span className="text-2xl font-semibold text-blue-600">
                            {Username}
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

// type Workout = {
//     name: string;
//     id: number;
// };

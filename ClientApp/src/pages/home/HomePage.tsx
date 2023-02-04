import { Container, Card, Box, Button } from "../../components/ui";

export default function Home() {
    const ingelogd = false;

    return <div>{ingelogd ? <h1>Welkom terug!</h1> : <HomeNietIngelogd />}</div>;
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

import Container from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import Box from "../components/ui/Box";

export default function Home() {
    const ingelogd = false;

    return (
        <div>
            <Container>
                {ingelogd ? <h1>Welkom terug!</h1> : <HomeNietIngelogd />}
            </Container>
        </div>
    );
}

function HomeNietIngelogd() {
    return (
        <div>
            <Container>
                <Card>
                    <Box>
                        <h1>Welkom bij de website van de</h1>
                    </Box>
                </Card>
            </Container>
        </div>
    );
}

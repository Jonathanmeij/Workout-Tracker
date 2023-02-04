import { Card, Container, Box } from "../components/ui";

export default function CenterCardPage({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Container className="flex items-center justify-center h-screen">
                <Card className="w-full max-w-lg">
                    <Box className="flex flex-col items-center justify-center w-full gap-4">
                        {children}
                    </Box>
                </Card>
            </Container>
        </div>
    );
}

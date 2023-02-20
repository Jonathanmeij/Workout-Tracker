import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import WorkoutPage from "./pages/workout/WorkoutPage";
import ExercisePage from "./pages/exercise/ExercisePage";
import AccountPage from "./pages/account/AccountPage";
import { RequireAuth } from "react-auth-kit";
import SessionPage from "./pages/session/SessionPage";

const AppRoutes = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/workout/:id",
        element: (
            <RequireAuth loginPath="/login">
                <WorkoutPage />
            </RequireAuth>
        ),
    },
    {
        path: "/workout/:id/exercise/:exerciseId",
        element: (
            <RequireAuth loginPath="/login">
                <ExercisePage />
            </RequireAuth>
        ),
    },
    {
        path: "/account",
        element: (
            <RequireAuth loginPath="/login">
                <AccountPage />
            </RequireAuth>
        ),
    },
    {
        path: "/workout/:id/exercise/:exerciseId/session/:sessionId",
        element: (
            <RequireAuth loginPath="/login">
                <SessionPage />
            </RequireAuth>
        ),
    },
];

export default AppRoutes;

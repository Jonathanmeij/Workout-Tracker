import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import WorkoutPage from "./pages/workout/WorkoutPage";
import ExercisePage from "./pages/exercise/ExercisePage";
import AccountPage from "./pages/account/AccountPage";

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
        element: <WorkoutPage />,
    },
    {
        path: "/workout/:id/:exerciseId",
        element: <ExercisePage />,
    },
    {
        path: "/account",
        element: <AccountPage />,
    },
];

export default AppRoutes;

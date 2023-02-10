import { Button } from "../../components/ui";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
    const signOut = useSignOut();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut();
        navigate("/");
    };

    return (
        <div className="flex flex-col max-w-lg gap-2 m-auto">
            <h1 className="text-2xl font-semibold tracking-tighter">Account</h1>
            <Button color="secondary" onClick={handleLogout} fullWidth>
                Logout
            </Button>
        </div>
    );
}

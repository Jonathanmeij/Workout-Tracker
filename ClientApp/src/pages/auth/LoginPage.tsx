import CenterCardPage from "../CenterCardPage";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../components/ui";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { login } from "./Login";
import { useSignIn } from "react-auth-kit";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => handleLogin(data);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const signIn = useSignIn();

    const handleLogin = async (data) => {
        try {
            if (await login(setError, data.email, data.password, signIn)) {
                navigate("/");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data.title === "Unauthorized") {
                    setError("Invalid email or password");
                }
            }
        }
    };

    return (
        <CenterCardPage>
            <h1 className="text-2xl font-semibold tracking-tighter">Login</h1>
            <div className="w-full max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        {error !== "" && <p className="text-red-500">{error}</p>}
                        <Input
                            register={register}
                            name="email"
                            placeholder="Email"
                            error={errors.email?.message?.toString()}
                            options={{
                                required: {
                                    value: true,
                                    message: "Email is required",
                                },
                            }}
                            fullWidth
                        />

                        <Input
                            register={register}
                            name="password"
                            placeholder="Password"
                            error={errors.password?.message?.toString()}
                            options={{
                                required: {
                                    value: true,
                                    message: "Password is required",
                                },
                            }}
                            type="password"
                            fullWidth
                        />

                        <Link to="/forgot-password">Forgot password?</Link>

                        <Button type="submit" color="primary" fullWidth>
                            Login
                        </Button>

                        <Button to="/register" color="none" padding="small">
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </CenterCardPage>
    );
}

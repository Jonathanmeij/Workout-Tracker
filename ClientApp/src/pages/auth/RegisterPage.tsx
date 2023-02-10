import CenterCardPage from "../CenterCardPage";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../components/ui";
import { useRef, useState } from "react";
import axios from "axios";
import { login } from "./Login";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const onSubmit = (data) => handleRegister(data);
    const password = useRef({});
    password.current = watch("password", "");
    const [error, setError] = useState("");
    const signIn = useSignIn();
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        try {
            const response = await axios.post("/api/auth/register", data);
            console.log(response);

            if (response.status === 201) {
                if (await login(setError, data.email, data.password, signIn)) {
                    navigate("/");
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.errors[0].description);
            }
        }
    };

    return (
        <CenterCardPage>
            <h1 className="text-2xl font-semibold tracking-tighter">Register</h1>
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

                        <Input
                            register={register}
                            name="passwordConfirm"
                            placeholder="Confirm password"
                            error={errors.passwordConfirm?.message?.toString()}
                            type="password"
                            options={{
                                required: {
                                    value: true,
                                    message: "Password confirmation is required",
                                },
                                validate: (value) =>
                                    value === password.current ||
                                    "The passwords do not match",
                            }}
                            fullWidth
                        />

                        <Button type="submit" color="primary" fullWidth>
                            Register
                        </Button>

                        <Button to="/login" color="none" padding="small">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </CenterCardPage>
    );
}

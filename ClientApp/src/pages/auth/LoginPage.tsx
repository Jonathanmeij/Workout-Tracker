import CenterCardPage from "../CenterCardPage";
import { useForm } from "react-hook-form";
import { Input, Button } from "../../components/ui";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    console.log(errors.password?.message?.toString());
    console.log(errors.email?.message?.toString());
    console.log(errors.name?.message?.toString());

    return (
        <CenterCardPage>
            <h1 className="text-2xl font-semibold tracking-tighter">Login</h1>
            <div className="w-full max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
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

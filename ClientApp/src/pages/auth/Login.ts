import axios, { AxiosError } from "axios";

export const login = async (setError, email, wachtwoord, signIn) => {
    try {
        const response = await axios
            .post("/api/auth/login", {
                email: email,
                password: wachtwoord,
            })
            .catch((err) => {
                console.log("err: ", err);
                const error = err.response.statusText;
                if (error === "Unauthorized") {
                    setError("Verkeerde email of wachtwoord");
                }
            });

        if (response) {
            if (
                await signIn({
                    token: response.data.token,
                    expiresIn: 60,
                    tokenType: "Bearer",
                    authState: { email: email },
                })
            ) {
                return true;
            }
        }
    } catch (error: any) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data);
        }
        console.log(error);
        return false;
    }
};

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
            console.log(response);

            if (
                await signIn({
                    token: response.data.token,
                    expiresIn: 60,
                    tokenType: "Bearer",
                    authState: { email: email },
                    refreshToken: response.data.refreshToken,
                    refreshTokenExpireIn: response.data.refreshTokenExpiryIn,
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

// const postLogin = (email, wachtwoord) => {
//     return axios
//         .post("/api/auth/login", {
//             email: email,
//             password: wachtwoord,
//         })
//         .catch((err) => {
//             console.log("err: ", err);
//             const error = err.response.statusText;
//             if (error === "Unauthorized") {
//                 throw new Error("Verkeerde email of wachtwoord");
//             }
//         });
// };

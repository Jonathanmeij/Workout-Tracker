import axios from "axios";
import { createRefresh } from "react-auth-kit";

const refreshApi = createRefresh({
    interval: 0.5,
    refreshApiCallback: ({
        authToken,
        refreshToken,
        authUserState,
        authTokenExpireAt,
        refreshTokenExpiresAt,
    }) => {
        // const yourConfig = {
        //     headers: {
        //         Authorization: "bearer " + authToken,
        //     },
        // };
        // const request = {
        //     refreshToken: refreshToken,
        // };
        return axios
            .post("/api/auth/refresh", {
                refreshToken: refreshToken,
                token: authToken,
            })
            .then(({ data }) => {
                console.log(data);
                return {
                    isSuccess: true,
                    newAuthToken: data.refreshToken,
                    newAuthTokenExpireAt: 1,
                    // refreshTokenExpiresA: refreshTokenExpiresAt,
                };
            })
            .catch((err) => {
                console.log(err);
                return {
                    isSuccess: false,
                    newAuthToken: "",
                };
            });
    },
});

export default refreshApi;

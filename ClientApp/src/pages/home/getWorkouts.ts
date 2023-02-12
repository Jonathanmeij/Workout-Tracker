import axios from "axios";

export function getWorkouts(userToken: string) {
    const yourConfig = {
        headers: {
            Authorization: userToken,
        },
    };
    return axios.get("/api/workout", yourConfig);
}

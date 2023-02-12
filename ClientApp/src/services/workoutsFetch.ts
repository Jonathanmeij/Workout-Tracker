import axios from "axios";

export function postSession(session, token) {
    const yourConfig = {
        headers: {
            Authorization: token,
        },
    };
    return axios.post("/api/session", session, yourConfig);
}

export function postWorkout(workout, token) {
    const yourConfig = {
        headers: {
            Authorization: token,
        },
    };
    return axios.post("/api/workout", workout, yourConfig);
}

export function postExercise(exercise, token) {
    const yourConfig = {
        headers: {
            Authorization: token,
        },
    };
    return axios.post("/api/exercise", exercise, yourConfig);
}

export function getWorkouts(userToken: string) {
    const yourConfig = {
        headers: {
            Authorization: userToken,
        },
    };
    return axios.get("/api/workout", yourConfig);
}

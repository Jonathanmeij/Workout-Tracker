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

export function deleteWorkout(workoutId, token) {
    const yourConfig = {
        headers: {
            Authorization: token,
        },
    };
    return axios.delete(`/api/workout/${workoutId}`, yourConfig);
}

export function putWorkout(workout, token) {
    const yourConfig = {
        headers: {
            Authorization: token,
        },
    };
    return axios.put(`/api/workout/${workout.id}`, workout, yourConfig);
}

export function postExercise(exercise, token) {
    const yourConfig = {
        headers: {
            Authorization: token,
        },
    };
    return axios.post("/api/exercise", exercise, yourConfig);
}

export function deleteExercise(exerciseId, token) {
    const yourConfig = {
        headers: {
            Authorization: token,
        },
    };
    return axios.delete(`/api/exercise/${exerciseId}`, yourConfig);
}

export function putExercise(exercise, token) {
    const yourConfig = {
        headers: {
            Authorization: token,
        },
    };
    return axios.put(`/api/exercise/${exercise.id}`, exercise, yourConfig);
}

export function getWorkouts(userToken: string) {
    const yourConfig = {
        headers: {
            Authorization: userToken,
        },
    };
    return axios.get("/api/workout", yourConfig);
}

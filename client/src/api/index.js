import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
});

export const userRegister = async (userData) => {
    const response = await API.post("/user/register", userData);
    return response.data;
}

export const userLogin = async (userData) => {
    const response = await API.post("/user/login", userData);
    return response.data;
}

export const getDashboard = async (token) => {
    const response = await API.get("/user/dashboard", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

export const getWorkoutByDate = async (token, date) => {
    const response = await API.get("/user/workout", date, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    return response.data;
}

export const addWorkout = async (token, workoutData) => {
    const response = await API.post("/user/workout", workoutData, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    return response.data;
}

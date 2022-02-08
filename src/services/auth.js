import axios from 'axios';

const PREFIX = '/api';
export const loginUser = async (username, password) => {
    try {
        const rawRes = await axios.post(`http://localhost:8080${PREFIX}/login`, {
            username: username.trim(),
            password: password.trim()
        })
        return rawRes.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
}

export const registerUser = async ({ username, password }) => {
    try {
        const rawRes = await axios.post(`http://localhost:8080${PREFIX}/register`, {
            username,
            password
        });
        return rawRes.data;
    } catch (error) {
        // console.log(error.response.data);
        throw new Error(error.response.data);
    }
}


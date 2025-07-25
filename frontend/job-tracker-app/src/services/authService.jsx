import axios from 'axios';

const API_URL = 'VITE_API_BASE_URL'

export const register = async (userData) => {
    return axios.post(`${API_URL}/register`, userData)
}

export const login = async (userData) => {
    return axios.post(`${API_URL}/login`, userData)
}
export const getUsers = async (token) => {
    return axios.get(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const logOut = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
}
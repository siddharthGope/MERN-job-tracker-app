import React, { useState } from 'react'
import { login, logOut } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { register } from '../../services/authService'
function Authentication() {


    // Registration
    const [registrationData, setRegistrationData] = useState({ username: '', password: '' });
    const [registrationMessage, setRegistrationMessage] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            await register(registrationData)
            setRegistrationMessage('Registration successful! Now you can log in.')
        } catch (error) {
            setRegistrationMessage(error.response?.data?.message || 'Error during registration')
        }
    }



    // Login
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            const res = await login(loginData)
            const token = res.data.token
            localStorage.setItem('token', token)
            setMessage('Login successful')
            navigate('/dashboard')
            runLogOutTimer()
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed')
        }
    }

    function runLogOutTimer() {
        const token = localStorage.getItem('token')
        if (token) {
            const { exp } = jwtDecode(token)

            const expiryTime = exp * 1000 - Date.now() //millisec
            console.log(expiryTime);

            const timer = setTimeout(() => {
                logOut()
            }, expiryTime)
            return () => clearTimeout(timer)
        }
    }
    return (
        <div className='min-h-screen bg-gray-100 bgauth'>
            todo: todo form validation, land to all jobs page,conditional link show hide, change app name, more beautiful ui
            <h1 className='pt-[5rem] text-bold text-center text-2xl'>Welcome to JobTracker web app! It helps users manage and track your job applications</h1>
            <div className="flex items-center justify-center pt-[5rem]">
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Register Card */}
                    <div className="bg-white h-full rounded-lg shadow-lg p-8 flex flex-col items-center mx-3">
                        <h3 className="text-xl font-bold mb-6 text-[#3b82f6]">Register</h3>
                        <form onSubmit={handleRegistration} className="w-full flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={registrationData.username}
                                onChange={e => setRegistrationData({ ...registrationData, username: e.target.value })}
                                required
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={registrationData.password}
                                onChange={e => setRegistrationData({ ...registrationData, password: e.target.value })}
                                required
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                type="submit"
                                className="bg-[#3b82f6] text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                            >
                                Register
                            </button>
                        </form>
                        <p className="mt-4 text-green-600">{registrationMessage}</p>
                    </div>
                    {/* <div className=' bg-gray-300 h-dvh w-px flex-col'></div> */}
                    {/* Login Card */}
                    <div className="bg-white h-full rounded-lg shadow-lg p-8 flex flex-col items-center mx-3">
                        <h3 className="text-xl font-bold mb-6 text-[#10b981]">Login</h3>
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={loginData.username}
                                onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                                required
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                required
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                type="submit"
                                className="bg-[#10b981] text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                            >
                                Login
                            </button>
                        </form>
                        <p className="mt-4 text-green-600">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication
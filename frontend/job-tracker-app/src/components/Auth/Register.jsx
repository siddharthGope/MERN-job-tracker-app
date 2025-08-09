import React from 'react'
import { register } from '../../services/authService'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import Right from '../../assets/right-arrow-icon.png';
import circle from '../../assets/circle.svg';


function Register() {
    const [registrationData, setRegistrationData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register(registrationData)
            setMessage('Registration successful! Now you can log in.')
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error during registration')
        }
    }


    return (
        <div className='min-h-screen bg-gray-100 bgauth'>
            <div className="flex items-center justify-center h-[100vh]">

                <div className="card-wrap card">
                    <img src={circle} alt="" className='bg-circle' />
                    <div className="auth-cards flex flex-col items-center mx-3">
                        <h3 className="text-xl font-bold mb-6 text-[#3b82f6]">Register</h3>
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={registrationData.username}
                                onChange={e => setRegistrationData({ ...registrationData, username: e.target.value })}
                                required
                                className="inputs"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={registrationData.password}
                                onChange={e => setRegistrationData({ ...registrationData, password: e.target.value })}
                                required
                                className="inputs"
                            />
                            <button
                                type="submit"
                                className="bg-[#3b82f6] submit-btn"
                            >
                                <img src={Right} alt="" className='right-arr mr-2' />
                                Register
                            </button>
                        </form>
                        <p className="mt-4 text-green-600">{message}</p>
                        <p className='mt-4 '><span className="text-gray-400 font-500">Already have an account?</span> <Link to="/login" className='text-blue-600'>SignIn</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
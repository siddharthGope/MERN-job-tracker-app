import React from 'react'
import { register } from '../../services/authService'
import { useState } from 'react'


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
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' value={registrationData.username}
                    onChange={e => setRegistrationData({ ...registrationData, username: e.target.value })} required />

                <input type="password" placeholder='Password' value={registrationData.password}
                    onChange={e => setRegistrationData({ ...registrationData, password: e.target.value })} required />

                <button type='submit'>Register</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default Register
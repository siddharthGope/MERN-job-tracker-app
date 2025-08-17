import React from 'react'
// import { register } from '../../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../features/auth/authSlice';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Right from '../../assets/right-arrow-icon.png';
import circle from '../../assets/circle.svg';
import Loading from '../Chart/Loading';


function Register() {
    const [registrationData, setRegistrationData] = useState({ username: '', password: '' });
    // const [message, setMessage] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, regError } = useSelector((state) => state.auth)

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(registerUser(registrationData)).unwrap()
            .then(navigate('/login'))
            .catch(() => { })

    }


    return (
        <div className='min-h-screen bg-gray-100 bgauth'>
            <div className="flex items-center justify-center pt-[150px]">

                <div className="card-wrap card  bg-gray-300">
                    <img src={circle} alt="" className='bg-circle' />
                    <div className="auth-cards flex flex-col items-center mx-3">
                        <h3 className="text-xl font-bold mb-2 text-[#136dff]">Register</h3>
                        <p className="text-sm font-medium mb-6 text-gray-400" >Join and organize your future opportunities now!</p>
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                            {regError && <p className="mt-4 text-red-600">{regError}</p>}
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
                            {
                                loading ? (<Loading />) : (<button
                                    type="submit"
                                    className="bg-[#136dff] submit-btn"
                                >
                                    <img src={Right} alt="" className='right-arr mr-2' />
                                    Register
                                </button>)
                            }

                        </form>
                        <p className='mt-4 '><span className="text-gray-400 font-500">Already have an account?</span> <Link to="/login" className='text-blue-600'>SignIn</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
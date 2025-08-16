import React, { useState } from 'react'
import { logOut } from '../../services/authService';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, getUser } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Right from '../../assets/right-arrow-icon.png';
import Loading from "../../components/Chart/Loading"


function Login() {

    const [loginData, setLoginData] = useState({ username: '', password: '' });
    // const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, loginError } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {

        e.preventDefault()

        dispatch(loginUser(loginData)).unwrap()
            .then((data) => {
                const token = data.token
                dispatch(getUser(token))
                navigate('/dashboard')
                runLogOutTimer()
            }
            )
            .catch((err) => {
                console.error("Login error", err);
            })
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
        <div className='min-h-screen bg-gray-100 bgauth pt-[150px]'>
            {/* todo: todo form validation, land to all jobs page,conditional link show hide, change app name, more beautiful ui */}
            <div className="flex items-center justify-center h-[100%]">

                <div className="card-wrap card">
                    <div className="auth-cards flex flex-col items-center mx-3">
                        <h3 className="text-xl font-bold mb-2 text-[#4f46e5]">Login</h3>
                        <p className="text-sm font-medium mb-6 text-gray-400" >Join and organize your future opportunities now!</p>
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                            {loginError && <p className="mt-4 text-red-600">{loginError}</p>}
                            <input
                                type="text"
                                placeholder="Username"
                                value={loginData.username}
                                onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                                required
                                className="inputs"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                required
                                className="inputs"
                            />
                            {
                                loading ? (<Loading />) : (<button
                                    type="submit"
                                    className="bg-[#4f46e5] submit-btn"
                                >
                                    <img src={Right} alt="" className='right-arr mr-2' />
                                    Login
                                </button>)
                            }

                        </form>

                        <p className='mt-4 '><span className="text-gray-400 font-500">Don't have an account?</span> <Link to="/register" className='text-blue-600'>SignUp</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
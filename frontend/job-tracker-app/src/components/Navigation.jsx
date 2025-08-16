import React, { useState } from 'react'
import {
    Link,
    NavLink,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut } from "../features/auth/authSlice";
import hamburger from "../assets/hamburger.svg";
import close from '../assets/close.svg';
import { useTheme } from '../context/ThemeContext';


function Navigation() {

    const { isAuthenticated, user } = useSelector((state) => state.auth)
    const [openNav, setOpenNav] = useState(false);
    const { theme, toggleTheme } = useTheme()

    return (
        <div>
            <nav className="bg-white shadow-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center hidden md:flex">
                    {/* Logo */}
                    <div>
                        <Link to="/" className="text-xl font-bold text-blue-600">
                            JobTrackr
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        {
                            isAuthenticated ? (
                                <>
                                    <button onClick={toggleTheme} className={theme === 'light' ? '🌛' : '🌞'}>{theme === 'light' ? '🌛' : '🌞'}</button>
                                    <NavLink className={({ isActive }) =>
                                        (isActive
                                            ? "text-blue-600 border-b-2 border-blue-600"
                                            : "text-gray-600 hover:text-blue-600") +
                                        " text-sm font-medium px-2 py-1 transition-all"
                                    } to="/dashboard">Dashboard</NavLink>

                                    <button
                                        className="text-sm font-medium px-2 py-1 transition-all cursor-pointer"
                                        onClick={() => logOut()}
                                    >
                                        Log out
                                    </button>
                                    <span className="text-sm font-medium px-2 py-1">Hello {user}</span>

                                </>


                            ) : (

                                <>
                                    <NavLink className={({ isActive }) =>
                                        (isActive
                                            ? "text-blue-600 border-b-2 border-blue-600"
                                            : "text-gray-600 hover:text-blue-600") +
                                        " text-sm font-medium px-2 py-1 rounded-md transition-all"
                                    } to="/login">Login</NavLink>
                                    <NavLink className={({ isActive }) =>
                                        (isActive
                                            ? "text-blue-600 border-b-2 border-blue-600"
                                            : "text-gray-600 hover:text-blue-600") +
                                        " text-sm font-medium px-2 py-1 rounded-md transition-all"
                                    } to="/register">Register</NavLink>
                                </>

                            )
                        }

                    </div>
                </div>

                <div className="mobile-nav block md:hidden">
                    <div className="flex justify-between items-center p-4 ">
                        <div className="block md:hidden">
                            <Link to="/" className="text-xl font-bold text-blue-600">
                                JobTrackr
                            </Link>
                        </div>

                        <div className="block md:hidden">
                            <button onClick={() => setOpenNav(!openNav)} type="button">
                                {openNav ? (<img
                                    src={close}
                                    alt="close"
                                    className="w-[20px]"
                                />) : (<img
                                    src={hamburger}
                                    alt="hamburger"
                                    className="w-[20px]"
                                />)}
                            </button>
                        </div>
                    </div>

                    {openNav && (<div className=" bg-white h-full p-4 block md:hidden transition-all duration-500 ease-in-out transform">
                        <div className="flex flex-col items-center gap-4">
                            {
                                isAuthenticated ? (
                                    <>
                                        <NavLink className={({ isActive }) =>
                                            (isActive
                                                ? "text-blue-600 border-b-2 border-blue-600"
                                                : "text-gray-600 hover:text-blue-600") +
                                            " text-sm font-medium px-2 py-1 rounded-md transition-all"
                                        } to="/dashboard">Dashboard</NavLink>
                                        <NavLink className={({ isActive }) =>
                                            (isActive
                                                ? "text-blue-600 border-b-2 border-blue-600"
                                                : "text-gray-600 hover:text-blue-600") +
                                            " text-sm font-medium px-2 py-1 rounded-md transition-all"
                                        } to="/jobs">All Jobs</NavLink>

                                        <span>Hello,{user}</span>

                                        <button
                                            className="text-sm font-medium px-2 py-1 rounded-md transition-all"
                                            onClick={() => logOut()}
                                        >
                                            Log out
                                        </button>
                                    </>


                                ) : (

                                    <>
                                        <NavLink className={({ isActive }) =>
                                            (isActive
                                                ? "text-blue-600 border-b-2 border-blue-600"
                                                : "text-gray-600 hover:text-blue-600") +
                                            " text-sm font-medium px-2 py-1 rounded-md transition-all"
                                        } to="/login">Login</NavLink>
                                        <NavLink className={({ isActive }) =>
                                            (isActive
                                                ? "text-blue-600 border-b-2 border-blue-600"
                                                : "text-gray-600 hover:text-blue-600") +
                                            " text-sm font-medium px-2 py-1 rounded-md transition-all"
                                        } to="/register">Register</NavLink>
                                    </>

                                )
                            }
                        </div>
                    </div>

                    )}

                </div>
            </nav>
        </div>
    )
}

export default Navigation
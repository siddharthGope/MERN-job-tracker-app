import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoutes from "./routing/PrivateRoutes";
import Dashboard from "./components/Protected/Dashboard";
import Jobs from "./components/Protected/Job/Jobs";
import { logOut } from "./services/authService";
import Authentication from "./components/Auth/Authentication";
import hamburger from "./assets/hamburger.svg";
import close from './assets/close.svg';
import { useState } from "react";

function App() {
  const [openNav, setOpenNav] = useState(false);
  const currentPathname = window.location.pathname;
  console.log(currentPathname);
  const navlinks = [
    { name: "See all jobs", path: "/jobs" },
    { name: "Dashboard", path: "/dashboard" },
    // { name: "Register", path: '/' },
    { name: "Signin/Login", path: "/" },
  ];

  return (
    <>
      <Router>
        <nav className="bg-white shadow-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center hidden md:flex">
            {/* Logo */}
            <div>
              <Link to="/" className="text-xl font-bold text-blue-600">
                JobTrackr
              </Link>
            </div>
            <div className="flex items-center gap-6">
              {navlinks.map((link, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    (isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-600") +
                    " text-sm font-medium px-2 py-1 rounded-md transition-all"
                  }
                  to={link.path}
                >
                  {link.name}
                </NavLink>
              ))}
              <button
                className="text-sm font-medium px-2 py-1 rounded-md transition-all"
                onClick={() => logOut()}
              >
                Log out
              </button>
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
                {navlinks.map((link, index) => (
                  <div key={index}>
                    <NavLink
                      className={({ isActive }) =>
                        (isActive
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-600") +
                        " text-sm font-medium px-2 py-1 rounded-md transition-all"
                      }
                      to={link.path}
                    >
                      {link.name}
                    </NavLink>
                  </div>
                ))}
                <button
                  className="text-sm font-medium px-2 py-1 rounded-md transition-all"
                  onClick={() => logOut()}
                >
                  Log out
                </button>
              </div>
            </div>

            )}

          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/register" element={<Authentication />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/jobs" element={<Jobs />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

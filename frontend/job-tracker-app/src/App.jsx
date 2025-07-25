import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateRoutes from './routing/PrivateRoutes';
import Dashboard from './components/Protected/Dashboard';
import Jobs from './components/Protected/Job/Jobs';
import { logOut } from './services/authService';
import Authentication from './components/Auth/Authentication';

function App() {
  // const location = useLocation()
  const currentPathname = window.location.pathname
  console.log(currentPathname);
  const navlinks = [
    { name: "See all jobs", path: '/jobs' },
    { name: "Dashboard", path: '/dashboard' },
    { name: "Register", path: '/' },
    { name: "Login", path: '/' },
  ]

  return (
    <>
      <Router>
        <nav className="bg-white shadow-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-blue-600">
              JobTrackr
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              {navlinks.map((link, index) => (
                <Link key={index} className={`${currentPathname === link.path ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"} text-sm font-medium px-2 py-1 rounded-md transition-all`} to={link.path}>{link.name}</Link>
              ))}

              {/* <Link className='text-sm font-medium px-2 py-1 rounded-md transition-all' to="/dashboard">Dashboard</Link>
              <Link className='text-sm font-medium px-2 py-1 rounded-md transition-all' to="/">Register</Link> |
              <Link className='text-sm font-medium px-2 py-1 rounded-md transition-all' to="/login">Login</Link> */}
              <button onClick={() => logOut()}>Log out</button>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/jobs' element={<Jobs />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

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
// import Authentication from "./components/Auth/Authentication";
import { ThemeProvider } from "./context/ThemeContext";
import Navigation from './components/Navigation';

function App() {

  return (
    <ThemeProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/jobs" element={<Jobs />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

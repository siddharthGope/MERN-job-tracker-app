import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { lazy, Suspense } from "react";
const Register = lazy(() => import("./components/Auth/Register"))
const Login = lazy(() => import("./components/Auth/Login"))
const PrivateRoutes = lazy(() => import("./routing/PrivateRoutes"))
const Dashboard = lazy(() => import("./components/Protected/Dashboard"))
const Jobs = lazy(() => import("./components/Protected/Job/Jobs"))
const Navigation = lazy(() => import('./components/Navigation'))

import { ThemeProvider } from "./context/ThemeContext";


function App() {


  return (
    <ThemeProvider>
      <Router>
        <Suspense>
          <Navigation />
        </Suspense>
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

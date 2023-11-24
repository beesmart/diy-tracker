import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import GuestLayout from "./components/common/GuestLayout";
import DefaultLayout from "./components/common/DefaultLayout";
import Dashboard from "./views/app/Dashboard";
import Login from "./views/frontend/Login";
import Signup from "./views/frontend/Signup";
import Jobs from "./views/app/Jobs";
import Home from "./views/frontend/Home";
import JobView from "./views/app/JobView";

const router = createBrowserRouter([
  
    {
        path: "/app",
        element: <DefaultLayout />,
        children: [
            {
                path: "/app/dashboard",
                element: <Navigate to="/app" />,
            },
            {
                path: "/app",
                element: <Dashboard />
            },
            {
                path: "/app/jobs",
                element: <Jobs />
            },
            {
                path: "/app/jobs/create",
                element: <JobView />
            }
        ] 
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/dashboard",
                element: <Navigate to="/app" />,
            }
        ]
    },
    
])


export default router;
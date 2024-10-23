import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Features from "../components/Features"
import Pricing from "../components/Pricing"
import Working from "../components/Working"
import Testimonials from "../components/Testimonials"
import SignupLoginin from "../components/SignupLogin";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/features",
                element: <Features />
            },
            {
                path: "/pricing",
                element: <Pricing />
            },
            {
                path: "/working",
                element: <Working />
            },
            {
                path: "/testimonials",
                element: <Testimonials />
            },
            {
                path: "/signup",
                element: <SignupLoginin />
            }
        ]
    }
])
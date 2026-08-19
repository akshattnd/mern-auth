import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path="/about" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/auth";
import Login from "./components/login";
import Home from "./components/pages/Home";
import Moods from "./components/pages/Moods";
import Header from "./components/elements/Header";
import Profile from "./components/pages/Profile";
import './App.css'
import CalendarCom from "./components/pages/CalendarCom";


function AppRouter() {

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/moods" element={<Moods />} />
                <Route path="/calendar" element={<CalendarCom />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>

        </Router>
    )

}

export default AppRouter
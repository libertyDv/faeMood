import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/auth";
import Login from "./components/login";

function AppRouter() {

    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/login" element={<Login />} />
            </Routes>

        </Router>
    )

}

export default AppRouter
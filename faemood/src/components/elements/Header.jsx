import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Header() {
    const navigate = useNavigate()


    const goToHome = () => {
        navigate("/home")
    }

    const goToMoods = () => {
        navigate("/moods")
    }

    const goToCalendar = () => {
        navigate("/calendar")
    }

    const goToProfile = () => {
        navigate("/profile")
    }
    

    return (
        <>

            <header className="header">
            <button onClick={goToHome}>Home</button>
                <button onClick={goToMoods}>Add mood</button>
                <button onClick={goToCalendar}>Calendar</button>
                <button onClick={goToProfile}>Profile</button>
            </header>

        </>
    )
}

export default Header
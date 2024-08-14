import { useNavigate } from "react-router-dom";
import '../../styles/Header.css'


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
            <button className="btnHeader" onClick={goToHome}>Home</button>
                <button className="btnHeader" onClick={goToMoods}>Add mood</button>
                <button className="btnHeader" onClick={goToCalendar}>Calendar</button>
                <button className="btnHeader" onClick={goToProfile}>Profile</button>
            </header>

        </>
    )
}

export default Header
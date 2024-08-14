import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import '../AuthStyle.css'
import { useNavigate } from "react-router-dom";
import '../AuthStyle.css'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    console.log(auth?.currentUser?.email)

    const isUserCorrect = async () => {


        try {
            await signInWithEmailAndPassword(auth, email, password)
            setError("")
            return true
        } catch (err) {
            setError("Usuario o contraseña incorrectos")
            return false
        }

    }

    const signIn = async () => {

        const userIsCorrect = await isUserCorrect();
        if (!userIsCorrect) {
            return;
        }

    }

    const goToHome = () => {
        navigate("/home")
    }

    const handleClick = () => {
        signIn()
        goToHome()
    }

    return (

        <>
            <div className="allContainer">
                <div className="divRegistro">
                    <input className="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}></input>
                    <input className="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>

                    <button onClick={handleClick}>Sign in</button>
                    {error && <p style={{ color: 'black' }}>{error}</p>}
                </div>
            </div>
        </>
    )


}

export default Login
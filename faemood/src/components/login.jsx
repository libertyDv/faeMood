import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import '../AuthStyle.css'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

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

    return(

    <div className="divRegistro">
            
            <input className="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}></input>
            <input className="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>

            <button onClick={signIn}>Sign in</button>
            {error && <p style={{ color: 'black' }}>{error}</p>}



        </div>
    )


}

export default Login
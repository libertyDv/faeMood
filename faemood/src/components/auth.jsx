// registro mediante correo y contraseña y cuenta de google

import { useState } from "react";
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";
import '../AuthStyle.css'

function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    console.log(auth?.currentUser?.email) //-> para ver que usuario está registrado

    const isValidPassword = (password) => {
        const hasLetters = /[a-zA-Z]/.test(password)
        const hasNumbers = /\d/.test(password);

        return password.length >= 6 && hasLetters & hasNumbers
    }

   

    // registrarse con correo y contraseña
    const signUp = async () => {

        if (!isValidPassword(password)) {
            setError("La contraseña debe de contener más de 6 caracteres y mínimo una letra y número")
        } else {
            setError("")
            try {
                await createUserWithEmailAndPassword(auth, email, password)
            } catch (err) {
                console.log(err)
            }
        }

    }

    // registrarse con google
    const signInWithGoogle = async () => {

        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.log(err)
        }
    }

 

    // salir de cuenta
    const logout = async () => {

        try {
            await signOut(auth)
        } catch (err) {
            console.log(err)
        }
    }

    // <button onClick={logout}> Logout</button>
  

    return (

        <div className="divRegistro">
            
            <input className="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}></input>
            <input className="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={signUp} className="signUp">Sign up</button>
            <button onClick={signInWithGoogle}>Sign up with google</button>

            {error && <p style={{ color: 'black' }}>{error}</p>}

            <p>Already have an account? Sign in! </p>
            <button onClick={signInWithGoogle}>Sign in with google</button>


            <button onClick={logout}> Logout</button>



        </div>

    )


}

export default Auth
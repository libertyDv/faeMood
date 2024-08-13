import { useEffect, useState } from "react";
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import '../AuthStyle.css';



function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(""); // Añadido estado para username
    const [error, setError] = useState("");
    const navigate = useNavigate();

    console.log(auth?.currentUser?.email); // Para ver qué usuario está registrado

    const isValidPassword = (password) => {
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        return password.length >= 6 && hasLetters && hasNumbers; 
    };

    // Registrarse con correo y contraseña
    const signUp = async () => {
        if (!isValidPassword(password)) {
            setError("La contraseña debe de contener más de 6 caracteres y mínimo una letra y número");
        } else {
            setError("");
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Guardar el nombre de usuario en Firestore
                const db = getFirestore();
                await setDoc(doc(db, "users", user.uid), {
                    username: username, // Usar estado `username`
                    email: user.email
                });
            } catch (err) {
                console.log(err);
                setError("Error al registrar el usuario. Inténtalo de nuevo.");
            }
        }
    };

    // Registrarse con Google
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.log(err);
            setError("Error al iniciar sesión con Google. Inténtalo de nuevo.");
        }
    };

    // Salir de cuenta
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
            setError("Error al cerrar sesión. Inténtalo de nuevo.");
        }
    };

    // Ir a la página de inicio de sesión
    const goToSignIn = () => {
        navigate("/login");
    };

    

    return (
        <div className="divRegistro">
            <input
                className="user"
                placeholder="Username..."
                onChange={(e) => setUsername(e.target.value)} // Cambiado setUser a setUsername
            />
            <input
                className="email"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signUp} className="signUp">Sign up</button>
            <button onClick={signInWithGoogle}>Sign up with Google</button>

            {error && <p style={{ color: 'black' }}>{error}</p>}

            <p>Already have an account? Sign in!</p>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            <button onClick={goToSignIn}>Sign in</button>

            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Auth;

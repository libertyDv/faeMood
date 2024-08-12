import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";



function Profile() {

    const [user, setUser] = useState(null) // almaceno info del usuario logeado
    const [userProfile, setUserProfile] = useState({}) // almaceno info del perfil del usuario desde firestore
    const [loading, setLoading] = useState(true) // carga

    useEffect(() => {
        // me subscribo a los cambios en el esttado de autenticación del usuario con onAuthStateChanged. se ejecuta cuando el usuario inicia, cierra sesion
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => { // unsubscribe sirve para llamarla mas taarde y limpiar recursos y evitar fugas de memoria
            if (currentUser) {
                setUser(currentUser);

                // obtener info desde firebase
                const userDocRef = doc(db, "user", currentUser.uid); // documento del perfil del usuario
                const userDoc = await getDoc(userDocRef); // obtiene el documento

                if (userDoc.exists()) {
                    setUserProfile(userDoc.data()); // obtengo los datos 
                } else {
                    console.log("No such document!");
                }

                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe(); // limpio el efecto cuando el componente se desmonte
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>No user is logged in</p>;
    }

    return (
        <>
            <h2>User Profile</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {userProfile.name || 'Not provided'}</p>

        </>
    )
}

export default Profile
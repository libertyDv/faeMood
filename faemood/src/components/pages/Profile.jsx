import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged, signOut, reauthenticateWithCredential, EmailAuthProvider, EmailAuthCredential } from "firebase/auth";
import '../../styles/Profile.css';
import Modal from "../elements/Modal";
import ModalDelete from "../elements/ModalDelete";


function Profile() {
    const [user, setUser] = useState(null); // almacena la información del usuario logeado
    const [loading, setLoading] = useState(true); // estado de carga
    const [isModalVisible, setIsModalVisible] = useState(false); // estado del modal de logout
    const [isDeleteAccModalVisible, setisDeleteAccModalVisible] = useState(false)
    const [password, setPassword] = useState("")

  

    // función para cerrar sesión
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = () => {
        setIsModalVisible(true); // muestra el modal
    };

    const handleConfirmLogout = () => {
        setIsModalVisible(false); // oculta el modal
        logout(); // cierra sesion
    };

    const handleCloseModal = () => {
        setIsModalVisible(false); // oculta el modal
    };

    const reauthenticateUser = async () => {
        const user = auth.currentUser
        const credential = EmailAuthProvider.credential(user.email, password)

        try {
            await reauthenticateWithCredential(user, credential)
            console.log("Reautenticación exitosa");
            return true
        } catch (err) {
            console.error("Error en la reautenticación:", err)
            return false
        }
    };



    // función para borrar cuenta
    const deleteUserAcc = async () => { // para que el usuario pueda borrar su cuenta debe de haberse registrado recientemente (funcion reuthenticateUser)
        const user = auth.currentUser
        if (user) {
            try {
                const reuthenticated = await reauthenticateUser()
                if(reuthenticated) {
                    try {
                        await user.delete()
                        console.log("Acc deleted")
                    } catch (err) {
                        console.error("Error al eliminar la cuenta: ", err)
                    }
                } else {
                    console.log("No se puede eliminar la cuenta")
                }

            } catch (err) {
                console.error("Error:", err)
            }
        }
    }

    const handleDeleteAcc = () => {
        setisDeleteAccModalVisible(true)
    }

    const handleConfirmDelete = () => {
        setisDeleteAccModalVisible(false)
        deleteUserAcc()
    }

    const handleCloseDelete = () => {
        setisDeleteAccModalVisible(false)
    }

    useEffect(() => {
        // subscripción a los cambios en el estado de autenticación del usuario
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe(); // limpiar el efecto cuando el componente se desmonte
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>No user is logged in</p>;
    }

    return (
        <div className="profilContainer">
            <h2 className="titP">User Profile</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <button className="logout" onClick={handleLogout}>Log out</button>
            <Modal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                onConfirm={handleConfirmLogout}
            />
            <button className="delete" onClick={handleDeleteAcc}>Delete account</button>
            <ModalDelete
                isVisible={isDeleteAccModalVisible}
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default Profile;

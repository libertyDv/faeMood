import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import '../../styles/Profile.css';
import Modal from "../elements/Modal";
import ModalDelete from "../elements/ModalDelete";


function Profile() {
    const [user, setUser] = useState(null); // almacena la información del usuario logeado
    const [loading, setLoading] = useState(true); // estado de carga
    const [isModalVisible, setIsModalVisible] = useState(false); // estado del modal de logout
    const [isDeleteAccModalVisible, setisDeleteAccModalVisible] = useState(false)

  

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

    // función para borrar cuenta

    const deleteUserAcc = async () => {
        const user = auth.currentUser
        if (user) {
            try {
                await user.delete()

                console.log("Account deleted")
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
            <p>image</p>
            <p><strong>Username:</strong></p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Email:</strong> {user.username}</p>
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

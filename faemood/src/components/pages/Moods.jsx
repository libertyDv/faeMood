import { db, auth } from "../../config/firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { useState } from "react"
import happy from "../../assets/happy.png"
import sad from "../../assets/sad.png"
import angry from "../../assets/angry.png"
import '../../styles/Moods.css'
import { useNavigate } from "react-router-dom";



const moodOptions = [
    { id: "happy", src: happy },
    { id: "sad", src: sad },
    { id: "angry", src: angry }
]

function Moods() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate()

    const moodCollectionRef = collection(db, "mood"); // hago referencia a la coleccion de mood que hay en firebase

    const goToCalendar = async () => {
        navigate("/calendar")
    }


    const onSubmitMood = async () => {
        try {
            if (selectedMood === null) {
                throw new Error("No mood selected"); // para que no se pueda añadir ningun mood sin antes seleccionarlo
            }

            // fecha actual
            const currentDate = new Date();

            await addDoc(moodCollectionRef, {
                type: selectedMood,
                comment: newComment,
                date: Timestamp.fromDate(currentDate),
                userId: auth?.currentUser?.uid
            });
            goToCalendar()
            console.log('Mood added successfully');
        } catch (err) {
            console.error('Error adding mood: ', err);
        }
    };

    

    return (
        <>
            <div className="moodsContainer">
                <div className="cardMood">
                    <h2 className="tit">Select Your Mood</h2>
                    <div style={{ display: "flex", gap: "10px" }}>
                        {moodOptions.map(mood => ( // itero sobre el array para crear un elemento para cadsa estado de animo
                            <div
                                key={mood.id}
                                style={{ cursor: "pointer", border: selectedMood === mood.id ? "2px solid blue" : "none" }}
                                onClick={() => setSelectedMood(mood.id)} // al pulsar el estado se coge la id del mood que es
                            >
                                <img
                                    src={mood.src}
                                    alt={mood.label}
                                    style={{ width: "100px", height: "100px" }}
                                />
                                <p>{mood.label}</p>
                            </div>
                        ))}
                    </div>
                    <div className="send">
                    <textarea
                        className="comentario"
                        placeholder='Thoughts...'
                        onChange={(e) => setNewComment(e.target.value)}
                        rows="4"
                        cols="50"
                    />
                    <button
                        className="btnMood"
                        onClick={onSubmitMood}>Submit Mood</button>
                        </div>
                </div>
            </div>
        </>
    );
}

export default Moods
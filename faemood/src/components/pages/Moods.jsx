import { db, auth, storage } from "../../config/firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { useState } from "react"
import happy from "../../assets/happy.png"
import sad from "../../assets/sad.png"
import angry from "../../assets/angry.png"


const moodOptions = [
    { id: "happy", src: happy},
    { id: "sad", src: sad},
    { id: "angry", src: angry}
]

function Moods() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [newComment, setNewComment] = useState("");

    const moodCollectionRef = collection(db, "mood");

    const onSubmitMood = async () => {
        try {
            if (selectedMood === null) {
                throw new Error("No mood selected");
            }

            // fecha actual
            const currentDate = new Date();

            await addDoc(moodCollectionRef, {
                type: selectedMood,
                comment: newComment,
                date: Timestamp.fromDate(currentDate), 
                userId: auth?.currentUser?.uid 
            });
            console.log('Mood added successfully');
        } catch (err) {
            console.error('Error adding mood: ', err);
        }
    };

    
    return (
        <>
            <div>
                <h2>Select Your Mood</h2>
                <div style={{ display: "flex", gap: "10px" }}>
                    {moodOptions.map(mood => (
                        <div 
                            key={mood.id} 
                            style={{ cursor: "pointer", border: selectedMood === mood.id ? "2px solid blue" : "none" }}
                            onClick={() => setSelectedMood(mood.id)}
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
                <input 
                    placeholder='Comment...' 
                    onChange={(e) => setNewComment(e.target.value)} 
                />
                <button onClick={onSubmitMood}>Submit Mood</button>
            </div>
        </>
    );
}

export default Moods
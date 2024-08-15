import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { db } from "../../config/firebase"
import { collection, getDocs } from "firebase/firestore";
import { format } from 'date-fns';
import '../../styles/Calendar.css';
import happy from "../../assets/happyF.png";
import sad from "../../assets/sadF.png";
import angry from "../../assets/angryF.png";
import bored from "../../assets/boredF.png";

const moodOptions = [
    { id: "happy", src: happy },
    { id: "sad", src: sad },
    { id: "angry", src: angry },
    { id: "bored", src: bored }
]

function CalendarCom() {

    const [value, setValue] = useState(new Date())
    const [moods, setMoods] = useState([])

    const moodCollectionRef = collection(db, "mood") // referencia a la coleccion de mood

    const getMoodImage = (type) => {
        const moodOption = moodOptions.find(option => option.id === type) // busco la opcion del mood que coincide con el tipo proporcionado
        return moodOption ? moodOption.src : null // devuelve el src, y si no lo encuentra devuelve null
    }

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const querySnapshot = await getDocs(moodCollectionRef) // coge los docs que hay en la referencia a la coleccion
                const moodData = querySnapshot.docs.map(doc => doc.data()) // mapea querySnapshot para extraer los datos de cada documento. devuelve el contenido del documnento como un objeto

                // mapeo los moods por fecha

                const formattedMoods = moodData.reduce((acc, mood) => { // uso el reduce para para transformar el array en un objeto que agrupa los moods por fecvha
                    const dataKey = format(mood.date.toDate(), 'yyyy-MM-dd') // convierto la fecha del mood en cadena para usarlo como key
                    if (!acc[dataKey]) { // inicializa un array para cada fecha si no existe
                        acc[dataKey] = []
                    }
                    acc[dataKey].push({ type: mood.type, comment: mood.comment }) // aquí es donde recojo el comentario con el tipo de mood
                    return acc
                }, {})
                setMoods(formattedMoods); // actualizo moods con el objeto formattedMoods que contiene los moods con fecha
            } catch (err) {
                console.error('Error fetching moods: ', err)
            }
        }
        fetchMoods();
    }, [])

    const handleDateChange = newDate => {
        setValue(newDate)
    }

    // muestra los moods del día ( un máximo de 3)
    const getMoodForDate = date => {
        const dateKey = format(date, 'yyyy-MM-dd')
        if (moods[dateKey]) {
            const displayedMoods = moods[dateKey].slice(0, 3).map(mood => mood.type); // limita a 3 moods
            return displayedMoods.join(' ')
        }
        return 'No mood';
    }

    // filtrar los comentarios para la fecha seleccionada junto al comment
    const getCommentsForDate = (date) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        if (moods[dateKey]) {
            return moods[dateKey].filter(mood => mood.comment); // filtro para devolver los comentarios
        }
        return [];
    };


    const commentsForSelectedDate = getCommentsForDate(value)

    return (
        <>
            <div className="calendarContainer">
                <h2 className="calendarTitle">Calendar</h2>
                <div className="calendar">
                    <Calendar
                        onChange={handleDateChange}
                        value={value}
                        tileContent={({ date, view }) => view === 'month' && (
                            <div style={{ padding: '5px', fontSize: '0.8em' }}>
                                {getMoodForDate(date)}
                            </div>
                        )}
                        className="custom-calendar"
                    />
                </div>

                <div className="commentsCards">
                    {commentsForSelectedDate.length > 0 ? (
                        commentsForSelectedDate.map((mood, index) => (
                            <div key={index} className="infoCard">
                                <img className="imgCard" src={getMoodImage(mood.type)} alt={mood.type} style={{ width: '60px', height: '50px' }} />
                                <p className="dateCard"> {format(value, 'yyyy-MM-dd')}</p>
                                <p className="commentCard"><strong>What you thought that day</strong><br></br> {mood.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No thoughts for this date</p>
                    )}
                </div>
            </div>
        </>
    )


}

export default CalendarCom
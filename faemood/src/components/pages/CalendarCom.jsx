import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { db } from "../../config/firebase"
import { collection, getDocs } from "firebase/firestore";
import { format } from 'date-fns';
import '../../styles/Calendar.css'

function CalendarCom() {

    const [value, setValue] = useState(new Date())
    const [moods, setMoods] = useState([])

    const moodCollectionRef = collection(db, "mood")

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const querySnapshot = await getDocs(moodCollectionRef)
                const moodData = querySnapshot.docs.map(doc => doc.data())

                // mapeo los moods por fecha

                const formattedMoods = moodData.reduce((acc, mood) => {
                    const dataKey = format(mood.date.toDate(), 'yyyy-MM-dd')
                    if (!acc[dataKey]) {
                        acc[dataKey] = []
                    }
                    acc[dataKey].push(mood.type)
                    return acc
                }, {})
                setMoods(formattedMoods);
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
            const displayedMoods = moods[dateKey].slice(0, 3); // Limita a 3 moods
            return displayedMoods.join(', ') + (moods[dateKey].length > 3 ? '...' : '')
        }
        return 'No mood';
    }

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
            </div>
        </>
    )


}

export default CalendarCom
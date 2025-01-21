import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";

const Schedule = () => {
    const [times, setTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        setTimes([
            { time: "09:00", isBooked: false },
            { time: "10:00", isBooked: false },
            { time: "11:00", isBooked: false },
            { time: "12:00", isBooked: false },
            { time: "13:00", isBooked: false },
            { time: "14:00", isBooked: false },
            { time: "15:00", isBooked: false },
            { time: "16:00", isBooked: false },
            { time: "17:00", isBooked: false },
            { time: "18:00", isBooked: false },
        ]);
    }, []);

    return (
        <div>
            <h2>Detta är schema komponenten</h2>
            <Calendar />
        </div>
    );
}

export default Schedule;
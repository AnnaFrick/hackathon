import React, { useEffect, useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { TimesContext } from "./TimesContext";

const Schedule = () => {
    const { times } = useContext(TimesContext);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Generate the three days to show
    const datesToShow = [startDate, addDays(startDate, 1), addDays(startDate, 2)];

    // Get all time slotts from the context, with dates, times and the room
    useEffect(() => {
        console.log("Times in scheduel: ", times);
    }, [times]);

    const handleTimeClick = (date, time) => {
        setSelectedDate(date);
        setSelectedTime(time);
    };

    const handlePrevious = () => {
        setStartDate((prevDate) => subDays(prevDate, 1));
    };

    const handleNext = () => {
        setStartDate((prevDate) => addDays(prevDate, 1));
    };

    return (
        <div>
            <h2>Schema med navigeringspilar</h2>

            {/* Navigation Arrows */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                <button
                    onClick={handlePrevious}
                    style={{
                        padding: "10px",
                        marginRight: "20px",
                        cursor: "pointer",
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                >
                    ← Föregående
                </button>
                <button
                    onClick={handleNext}
                    style={{
                        padding: "10px",
                        marginLeft: "20px",
                        cursor: "pointer",
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                >
                    Nästa →
                </button>
            </div>

            {/* Render each day with its corresponding time slots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                {datesToShow.map((date, index) => (
                    <div key={index} style={{ textAlign: "center", padding: "10px" }}>
                        {/* Display the date */}
                        <h3>{format(date, "yyyy-MM-dd")}</h3>

                        {/* Display time slots for the date */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                            {timeSlots.map((time, timeIndex) => (
                                <button
                                    key={timeIndex}
                                    onClick={() => handleTimeClick(date, time)}
                                    style={{
                                        padding: "10px",
                                        backgroundColor:
                                            selectedDate === date && selectedTime === time
                                                ? "#007BFF"
                                                : "#f0f0f0",
                                        color:
                                            selectedDate === date && selectedTime === time
                                                ? "white"
                                                : "black",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Display selected date and time */}
            {selectedDate && selectedTime && (
                <p>
                    Vald tid: {format(selectedDate, "yyyy-MM-dd")} kl. {selectedTime}
                </p>
            )}
        </div>
    );
};

export default Schedule;

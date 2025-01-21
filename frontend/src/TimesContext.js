import React, { useState, useEffect, createContext } from "react";

const TimesContext = createContext();
console.log("hejehje")

const TimesProvider = ({ children }) => {
    const [times, setTimes] = useState([]);
    const [dates, setDates] = useState([]);

    async function fetchTimes() {
        const response = await fetch("http://localhost:4000/rooms");
        const data = await response.json();
        console.log(data)
    }

    useEffect(() => {
        fetchTimes();
    }, []);

    return (
        <TimesContext.Provider value={{ times, dates }}>
            {children}
        </TimesContext.Provider>
    );
};

export { TimesProvider, TimesContext };

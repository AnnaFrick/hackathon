import React, { useState, useEffect } from 'react';

const DropDown = () => {

    const [selected, setSelected] = useState("Select an option");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(["Room1, Room2, Room3"]);
    }, []);


    return (
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default DropDown;
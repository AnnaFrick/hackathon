import React, { useState, useEffect, useRef } from "react";

const DropDownWithCheckboxes = () => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        setOptions(["Room1", "Room2", "Room3"]); // Initialize options
    }, []);

    // Handle checkbox toggle
    const handleCheckboxChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    // Handle Choose (console log the selected options)
    const handleChoose = () => {
        alert(`You have selected: ${selectedOptions.join(", ")}`);
    };

    // Handle Clear (reset selected options)
    const handleClear = () => {
        setSelectedOptions([]);
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} style={{ position: "relative", width: "200px" }}>
            {/* Dropdown label */}
            <div
                style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                }}
                onClick={toggleDropdown}
            >
                {selectedOptions.length > 0
                    ? `Selected: ${selectedOptions.join(", ")}`
                    : "Select options"}
            </div>

            {/* Dropdown content */}
            {isDropdownOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#fff",
                        zIndex: 10,
                        maxHeight: "150px",
                        overflowY: "auto",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        padding: "10px",
                    }}
                >
                    {options.map((option) => (
                        <div key={option} style={{ marginBottom: "5px" }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleCheckboxChange(option)}
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                    {/* Buttons inside the dropdown */}
                    <div
                        style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <button
                            onClick={handleChoose}
                            style={{
                                padding: "5px 10px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Välj
                        </button>
                        <button
                            onClick={handleClear}
                            style={{
                                padding: "5px 10px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Avmarkera
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDownWithCheckboxes;

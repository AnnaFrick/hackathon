import React, { useState } from 'react';
import Button from './Button';
import './Confirmation.css';

const Confirmation = ({ time, date }) => {
  const [name, setName] = useState('');
  const [isBooked, setIsBooked] = useState(false); // State for managing the pop-up visibility

  const handleBooking = (time, date, name) => {
    if (!name.trim()) {
      alert("Vänligen fyll i ditt namn!");
      return;
    }
    // Handle the booking logic here
    console.log(`Booking time: ${time}, date: ${date}, name: ${name}`);
    setIsBooked(true); // Show the pop-up
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const closePopup = () => {
    setIsBooked(false); // Hide the pop-up
  };
console.log("hejehje")
  return (
    <div className="container">
      <h2>Vem bokar?</h2>
      <p>Förnamn och efternamn</p>
      <input
        type="text"
        placeholder="Skriv ditt fullständiga namn här"
        value={name}
        onChange={handleNameChange}
      />
      <Button text="Boka" onclick={() => handleBooking(time, date, name)} />

      {/* Pop-up for confirmation */}
      {isBooked && (
        <div className="popup">
          <div className="popup-content">
            <p>Ditt rum är bokat!</p>
            <p>Tid: {time}</p>
            <p>Datum: {date}</p>
            <button onClick={closePopup}>Stäng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmation;

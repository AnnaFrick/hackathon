import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';

const Button = ({ text, link }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
    }

    return <button onClick={handleClick}>{text}</button>;
}

export default Button;
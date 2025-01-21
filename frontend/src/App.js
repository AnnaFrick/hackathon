import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Book from './Book';
import Confirmation from './Confirmation';
import { TimesContext, TimesProvider } from './TimesContext';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book" element={<Book />} />
                <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
        </Router>
    );
}


export default function AppWrapper() {
    return (
        <TimesProvider>
            <App />
        </TimesProvider>
    );
}
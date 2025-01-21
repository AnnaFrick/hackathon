import React from 'react';
import Button from './Button';

const Home = () => {
    return (
        <div>
            <h1>Boka ett rum</h1>
            <Button text="Boka ett rum" link="/book"/>
        </div>
    );
}

export default Home;
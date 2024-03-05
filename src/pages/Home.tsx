import React from 'react';
import ZoomBySwitch from '../components/ZoomBySwitch';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the content of the Text Style and Animation</p>
            <Link to="/Text-React-Ts/ZoomBySwitch">Go to Zoom by switch using button click</Link>
        </div>
    );
};

export default Home;
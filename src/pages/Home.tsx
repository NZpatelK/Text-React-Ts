import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the content of the Text Style and Animation</p>
            <Link to="/Text-React-Ts/ZoomBySwitch">Go to Zoom by switch using button click</Link>   
            <br />
            <Link to="/Text-React-Ts/ZoomBySwitch2">Go to Zoom by switch by using scroll</Link>
            <br />
            <Link to="LetterRotating">Go to Letter Rotating</Link>
            <br />
            <Link to="MultipleWordsZoom">Go to Mutliple words zoom</Link>
            <br />
            <Link to="SlidesZoom">Go to Mutliple words zoom</Link>
        </div>
    );
};

export default Home;
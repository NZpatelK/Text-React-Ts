import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Home: React.FC = () => {
    return (
        <div className='homepage'>
            <h1 style={{ margin: "0", textAlign: "center" }}>Welcome to the Text Components</h1>
            <p style={{ margin: "2px 0", textAlign: "center" }}>There are various components of text and it has amination and style. </p>

            <div className='LinkContainer'>
                <div className='LinkItem'>
                    <h2>Zoom by Switch</h2>
                    <p>Zoom by switch using button click to click next or back</p>
                    <Link to="ZoomBySwitch" className='Link'>Click Here</Link>
                </div>
                <div className='LinkItem'>
                    <h2>Zoom by Switch</h2>
                    <p>Zoom by switch using button click to click next or back</p>
                    <Link className='Link' to="ZoomBySwitch2">Go to Zoom by switch by using scroll</Link>
                </div>
                <div className='LinkItem'>
                    <h2>Zoom by Switch</h2>
                    <p>Zoom by switch using button click to click next or back</p>
                    <Link className='Link' to="LetterRotating">Go to Letter Rotating</Link>
                </div>
                <div className='LinkItem'>
                    <h2>Zoom by Switch</h2>
                    <p>Zoom by switch using button click to click next or back</p>
                    <Link className='Link' to="MultipleWordsZoom">Go to Mutliple words zoom</Link>
                </div>
                <div className='LinkItem'>
                    <h2>Zoom by Switch</h2>
                    <p>Zoom by switch using button click to click next or back</p>
                    <Link className='Link' to="SlidesZoom">Go to Slide zoom</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
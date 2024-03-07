import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';


const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='homepage'>
            <h1 style={{ margin: "0", textAlign: "center" }}>Welcome to the Text Components</h1>
            <p style={{ margin: "2px 0", textAlign: "center" }}>There are various components of text and it has amination and style. </p>

            <div className='LinkContainer'>
                <div className='LinkItem' onClick={() => navigate("ZoomBySwitch")}>
                    <h2>Zoom by Switch</h2>
                    <p>Create an animation that zooms in and out of text, activated by clicking buttons to move forward or backward.</p>
                    <Link to="ZoomBySwitch" className='Link'>Click Here</Link>
                </div>
                <div className='LinkItem' onClick={() => navigate("ZoomBySwitch2")}>
                    <h2>Zoom by Scroll</h2>
                    <p>To zoom in and out, simply scroll up and down. Scrolling down takes you to the next, while scrolling up moves you back.</p>
                    <Link className='Link' to="ZoomBySwitch2">Click Here</Link>
                </div>
                <div className='LinkItem' onClick={() => navigate("LetterRotating")}>
                    <h2>Letter Rotating</h2>
                    <p>The letters in the word rotate independently, each with its own distinct time delay before spinning. The delays vary by a few seconds for each letter, creating a dynamic and visually interesting effect.</p>
                    <Link className='Link' to="LetterRotating">Click Here</Link>
                </div>
                <div className='LinkItem' onClick={() => navigate("MultipleWordsZoom")}>
                    <h2>Mutliple Words Zoom</h2>
                    <p>Implementing a zoom in and out animation through scrolling with multiple words would add a cool and interesting effect."</p>
                    <Link className='Link' to="MultipleWordsZoom">Click Here</Link>
                </div>
                <div className='LinkItem' onClick={() => navigate("SlidesZoom")}>
                    <h2>Zoom by Slide</h2>
                    <p>slides</p>
                    <Link className='Link' to="SlidesZoom">Click Here</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
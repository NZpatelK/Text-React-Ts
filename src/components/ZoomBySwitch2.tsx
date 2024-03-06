import React, { useState } from 'react';
import { ZoomData } from '../Data/ZoomData';
import backButton from '../assets/turn-back.png';
import '../style/ZoomBySwitch.css';
import { Link } from 'react-router-dom';

const ZoomBySwitch: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [content, setContent] = useState(ZoomData);
    const [initialTouchY, setInitialTouchY] = useState<number>(0);
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    // ---------------------------------------------------------------------------------------------------//

    // This function is used to handle the mouse wheel event.
    const handleOnWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (e.deltaY < 0) {
            handleSwitch('left');
        }
        else if (e.deltaY > 0) {
            handleSwitch('right');

        }
    }

    // ---------------------------------------------------------------------------------------------------//

    // This function is used to handle the touch scroll event.
    const handleTouchScroll = (e: React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        const deltaY = e.touches[0].clientY - initialTouchY;
        setInitialTouchY(e.touches[0].clientY);

        if (deltaY < 0) {
            handleSwitch('left');
        }
        else if (deltaY > 0) {
            handleSwitch('right');
        }
    }

    // ---------------------------------------------------------------------------------------------------//

    // This function is used to handle the switch button click event.
    // The direction parameter is used to determine the direction of the switch.
    // The direction parameter can be either 'left' or 'right'.
    const handleSwitch = (direction: string) => {
        if (direction === 'left') {
            setIndex(index - 1);

            const updatedContent = content.map((data) => {
                if (data.id === index) {
                    data.TransitionStatus = 'leftTextExit';
                }

                if (data.id === index - 1) {
                    data.TransitionStatus = 'textEnter';
                }
                return data;
            });
            setContent(updatedContent);

        } else {
            setIndex(index + 1);
            const updatedContent = content.map((data) => {
                if (data.id === index) {
                    data.TransitionStatus = 'rightTextExit';
                }

                if (data.id === index + 1) {
                    data.TransitionStatus = 'textEnter';
                }
                return data;
            });
            setContent(updatedContent);
        }

        setIsButtonDisabled(true);
    };

    // ---------------------------------------------------------------------------------------------------//

    return (
        <div className='container' onWheel={(e) => !isButtonDisabled ? handleOnWheel(e) : null} onTouchMove={(e) => !isButtonDisabled ? handleTouchScroll(e) : null}>
            
            <div><Link to='/Text-React-Ts/'> <img className='backBtn' src={backButton} alt="" /> </Link></div>

            {content.map((data, index) => {
                return (<h1 key={index} className={'centered ' + data.TransitionStatus} onTransitionEnd={() => setIsButtonDisabled(false)}> {data.label} </h1>);
            })}

            <h3 className='message'>Scroll or Swipe down</h3>
        </div>
    );
};

export default ZoomBySwitch;
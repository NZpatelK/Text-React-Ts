import React, { useState } from 'react';
import { ZoomData2 } from './Data/ZoomData';
import backButton from '../../assets/turn-back.png';
import './ZoomBySwitch.css';
import { useNavigate } from 'react-router-dom';

const ZoomBySwitch2: React.FC = () => {
    const [content, setContent] = useState(ZoomData2);
    const [initialTouchY, setInitialTouchY] = useState<number>(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [index, setIndex] = useState(content.filter((data) => data.TransitionStatus === "textEnter")[0].id);
    const navigate = useNavigate();

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
        <div className='switchContainer' onWheel={(e) => !isButtonDisabled ? handleOnWheel(e) : null} onTouchMove={(e) => !isButtonDisabled ? handleTouchScroll(e) : null}>
            
            <div onClick={() => navigate(-1)}><img className='backBtn' src={backButton} alt="" /></div>

            {content.map((data, index) => {
                return (<h1 key={index} className={'centered ' + data.TransitionStatus} onTransitionEnd={() => setIsButtonDisabled(false)}> {data.label} </h1>);
            })}

            <h3 className='message'>Scroll or Swipe down</h3>
        </div>
    );
};

export default ZoomBySwitch2; 
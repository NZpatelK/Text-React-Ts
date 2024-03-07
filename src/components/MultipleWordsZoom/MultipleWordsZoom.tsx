import React, { useEffect, useState } from "react";
import { addNewWord, backChange, frontChange, initalWords, positionChange } from "./Utils/WordAminationsController";
import backButton from '../../assets/turn-back.png';
import { useNavigate } from 'react-router-dom';
import "./ZoomingWords.css";

interface Word {
  text: string;
  top: number;
  left: number;
  scale: number;
  opacity: number;
  blur: number;
}

const MultipleWordsZoom: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [front, setFront] = useState<number>(0);
  const [back, setBack] = useState<number>(4);
  const [total, setTotal] = useState<number>(0);
  const [initialTouchY, setInitiaTouchY] = useState<number>(0);
  const navigate = useNavigate();



  useEffect(() => {

    setWords(initalWords());

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };


  }, []);


  // -----------------------------------------------------------------------------------//
  // Desktop and Laptop
  const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default scrolling behavior
    const zoom = e.deltaY > 0 ? 0.1 : -0.1;

    if(!( words[0].scale < 5 && zoom < 0))
    {
      ModifyWord(zoom);
    }

  }

  // -----------------------------------------------------------------------------------//

  // Mobile and Tablet
  const handleTouchScroll = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default scrolling behavior
    const zoom = e.touches[0].clientY > initialTouchY ? -0.1 : 0.1;
    setInitiaTouchY(e.touches[0].clientY);
    ModifyWord(zoom);
  }

  // -----------------------------------------------------------------------------------//

  const ModifyWord = (zoom: number) => {

    const newTotal = total + zoom;

    setTotal(newTotal);


    if (newTotal >= 1 && words.length <= back + 1) {
      setTotal(0);
      setWords([...words, addNewWord(words.length)]);
      setBack(back + 1);
    }
    else if (newTotal >= 1) {
      setTotal(0);
      setBack(back + 1);
    }

    for (let index = front; index < back; index++) {


      words[index] = frontChange(words[index], zoom);
      words[index] = backChange(words[index], zoom);

      if (words[front].blur > 4 && zoom > 0) {
        words[front].opacity = 0;
        setFront(front + 1);
      }

      //----------------------------//

      if (words[index].scale < 0.2 && front - 1 >= 0 && zoom < 0) {
        setBack(back <= 4 ? 4 : back - 1);
        setFront(front <= 0 ? 0 : front - 1);
        setTotal(0);

        words[back - 1].blur = 2;
        words[back - 1].opacity = 0.1;
        words[back - 1].scale = 0.1;

        words[front - 1].opacity = 0.6;
      }
      else if (words[index].scale < 0.2 && back >= 2 && zoom < 0) {
        setBack(back <= 4 ? 4 : back - 1);
        setTotal(0);

        words[back - 1].blur = 2;
        words[back - 1].opacity = 0.1;
        words[back - 1].scale = 0.1;


      }

      //----------------------------//

      words[index].scale = words[index].scale + zoom;

      words[index] = positionChange(words[index], zoom);

    }
  };

  return (
    <div className="zoom-word-container" onWheel={handleWheelScroll} onTouchMove={handleTouchScroll}>
        <div onClick={() => navigate(-1)}><img className='backBtn' src={backButton} alt="" /></div>
      {words.map((word, index) => (
        <div
          key={index}
          className="zoom-word"
          style={{ top: word.top, left: word.left, transform: `scale(${word.scale})`, opacity: word.opacity, filter: `blur(${word.blur}px)` }}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
};

export default MultipleWordsZoom;

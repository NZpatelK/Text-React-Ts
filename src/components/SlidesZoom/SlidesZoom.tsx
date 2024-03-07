import React, { useEffect, useRef, useState } from 'react';
import './SlidesZoom.css';
import { backChange, frontChange, getInitialWords } from './Utils/SlideController';

interface getWord {
  index: number;
  type: string;
  className?: string;
  mainMessage?: MessageProp[];
  card?: CardProp[];
  motivational_words?: motivateWord[];
  scale: number;
  opacity: number;
  blur: number;
}

interface CardProp {
  title: string;
  message: string[];
}

interface motivateWord {
  top: number;
  left: number;
  word: string;
}

interface MessageProp {
  className: string;
  text: string;
}

const MainTextZoomIn: React.FC = () => {
  const [words, setWords] = useState<getWord[]>([]);
  const [backIndex, setBackIndex] = useState(1);
  const [frontIndex, setFrontIndex] = useState(0);
  const zoomElementRef = useRef<HTMLDivElement>(null);
  const ZOOM_SPEED = 0.1;

useEffect(() => {

    setWords(getInitialWords() as getWord[]);

}, []);


  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    const deltaY = e.deltaY;

    // Calculate the new zoom value based on the deltaY and ZOOM_SPEED
    const newZoom = deltaY > 0 ? ZOOM_SPEED : -ZOOM_SPEED;

    const updateWord = [...words];

    // -------------------------------------------------------------//

    //Update the scale whenever zoom value is changed
    updateWord[frontIndex] = frontChange(words[frontIndex], newZoom) as getWord;
    updateWord[frontIndex].scale += newZoom > 0 ? ZOOM_SPEED : -ZOOM_SPEED;

    if (updateWord[frontIndex].scale > 4.8 || newZoom < 0) {
        updateWord[backIndex] = backChange(words[backIndex], newZoom) as getWord;
        updateWord[backIndex].scale += newZoom > 0 ? ZOOM_SPEED : -ZOOM_SPEED;
    }

    // -------------------------------------------------------------//

    //when the front index is frist slide then we need to stop the zoom out
    if (frontIndex < 1 && newZoom < 0 && updateWord[frontIndex].scale < 0.6) {

      updateWord[frontIndex].scale = 0.6

    }

    //When the back index is last slide then we need to stop the zoom in
    if (backIndex > words.length - 2 && newZoom > 0 && updateWord[backIndex].scale > 7) {

      updateWord[backIndex].scale = 7
      updateWord[frontIndex].scale = 13

    }

    // -------------------------------------------------------------//

    //when the current slide is zoomed out then we need to move the back index to next slide and front index is update from back index
    if (updateWord[frontIndex].scale > 8 && newZoom > 0 && (backIndex < words.length - 1 || words[words.length - 1].opacity < 0.1)) {

      setFrontIndex(frontIndex + 1);
      setBackIndex(backIndex + 1);

    }

    //When the current slide is zoomed in then we need to move the front index to previous slide and back index is update from front index
    if (newZoom < 0 && updateWord[backIndex].opacity < 0.9 && frontIndex > 0 && words[frontIndex].scale < 4) {
      setFrontIndex(frontIndex - 1);
      setBackIndex(backIndex - 1);
    }

    // -------------------------------------------------------------//


    setWords(updateWord);


  };

  const getHtmlStatment = (word: getWord, index: number) => {
    

    if (word.type === "text") {

      return (
        <div
          key={index}
          className={word.className}
          style={{ transform: `scale(${word.scale})`, opacity: word.opacity, filter: `blur(${word.blur}px)` }}
        >
          {word.mainMessage?.map((item, index) => {

            console.log(item.text + " " + item.className)

            return (
              <p key={index} className={item.className}>{item.text}</p>
            );

          })}
        </div>);

    } else if (word.type === "card") {
      return (

        <div
          key={index}
          className={"ServiceContainer"}
          style={{ transform: `scale(${word.scale})`, opacity: word.opacity, filter: `blur(${word.blur}px)` }}
        >

          {word.card?.map((item, index) => {
            return (
              <div className="ServiceCard" key={index}>
                <div className="ServiceContent">
                  <h3>card</h3>
                  <ul>
                    {item.message.map((feature, index) => {
                      return (
                        <li key={index}>{feature}</li>
                      )
                    })}
                  </ul>
                  <h4>FREE</h4>
                </div>
              </div>
            );
          })}
        </div>

      );
    }

    else if (word.type === "mutlipleText") {

      return (
        <div
          key={index}
          className="mWord"
          id='parent-div'
          style={{ transform: `scale(${word.scale})`, opacity: word.opacity, filter: `blur(${word.blur}px)` }}
        >
          {word.motivational_words?.map((item, index) => {

            return (<p key={index} style={{ top: item.top, left: item.left}}>{item.word}</p>)

          })}
        </div>
      );
    }


  }


  return (
    <div className="workspace" ref={zoomElementRef} onWheel={handleWheel}>

      {words.map((word, index) => (
        getHtmlStatment(word, index)
      ))}
    </div>
  );
}

export default MainTextZoomIn;

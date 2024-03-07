import { ContentData } from "../Data/ContentData";


interface Word {
    index: number;
    type: string;
    className?: string;
    mainMessage?: MessageProp[];
    card?: unknown;
    motivational_words?: motivateWord[];
    scale: number;
    opacity: number;
    blur: number;
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

export const getInitialWords = (): Word[] => {

    const words: Word[] = [];

    ContentData.map((item, index) => {

        //This is initial state of the first slide of the start the website.
        if (index === 0) {
            words.push({
                index: index,
                type: item.type,
                className: item.className,
                mainMessage: item.message,
                card: item.cards,
                motivational_words: getMotivationalWords(item.motivational_words),
                scale: 1,
                opacity: 1,
                blur: 0,
            });
        } else {
            words.push({
                index: index,
                type: item.type,
                className: item.className,
                mainMessage: item.message,
                card: item.cards,
                motivational_words: getMotivationalWords(item.motivational_words),
                scale: 0.1,
                opacity: 0,
                blur: 5,
            });
        }

        return void 0;

    })

    return words;


}

const getMotivationalWords = (words?: string[]): motivateWord[] => {

    const motivateWords: motivateWord[] = [];

    words?.map((item) => {

        const getRandPostion = generateMainRandomPosition();

        motivateWords.push({
            top: getRandPostion.y,
            left: getRandPostion.x,
            word: item
        })

        return void 0;
    })

    return motivateWords;
}


export const frontChange = (word: Word, zoom: number): Word => {

    if (word.scale > 6) {
        word.opacity = 0
    }

    if (word.scale > 5) {
        word.opacity = word.opacity < 0 ? 0 : word.opacity - zoom;
    }

    if (word.scale > 4) {
        word.blur = word.blur < 0 ? 0 : word.blur + zoom*1;
        word.opacity = word.opacity > 1 ? 1 : word.opacity
    }

    return word;

}

export const backChange = (word: Word, zoom: number): Word => {

    if (word.scale < 2 && word.index !== 0) {
        word.blur = word.blur < 0 ? 0 : word.blur - zoom * 5;
        word.opacity = word.opacity > 1 ? 1 : word.opacity + zoom;
    }

    if (word.scale < 1) {
        word.opacity = word.opacity < 0 ? 0 : word.opacity + zoom;
    }
    if (word.scale < 0.05 && word.index !== 0 && zoom < 0) {
        word.scale = 0.1;
        word.opacity = 0;
        word.blur = 2;
    }

    if (word.scale < 0.5 && word.index === 0 && zoom < 0) {
        word.scale = 0.6;

    }

    return word;

}

export const generateMainRandomPosition = () => {
  const screenWidth = window.innerWidth*0.2;
  const screenHeight = window.innerHeight *0.2;
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;

  // Generate a random angle between 0 and 2 * PI
  const randomAngle = Math.random() * (2 * Math.PI);

  // Generate a random radius between 10 and 150 pixels
  const radius = 10; // Radius of each point
  const gap = 10; // Gap between points

  // Calculate the total space required for a point and the gap
  const totalSpace = radius * 2 + gap;

  // Calculate the number of points that can fit in the given screen width and height
  const numPointsX = Math.floor(screenWidth / totalSpace);
  const numPointsY = Math.floor(screenHeight / totalSpace);

  // Calculate the maximum allowed radius based on the number of points and the gap
  const maxAllowedRadiusX = (numPointsX * totalSpace - gap) / 2;
  const maxAllowedRadiusY = (numPointsY * totalSpace - gap) / 2;
  const maxAllowedRadius = Math.min(maxAllowedRadiusX, maxAllowedRadiusY);

  // Calculate the random radius within the allowed range
  const randomRadius = Math.random() * maxAllowedRadius;

  // Calculate the x and y coordinates based on the random angle and radius
  const x = centerX + randomRadius * Math.cos(randomAngle);
  const y = centerY + randomRadius * Math.sin(randomAngle);

  return { x, y };
};

  
  
  
  
  

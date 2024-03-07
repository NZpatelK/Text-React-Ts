interface Word {
    text: string;
    top: number;
    left: number;
    scale: number;
    opacity: number;
    blur: number;
}

interface ScreenSize{
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;

    circleRadius: number;
    startBlur: number;
    endBlur: number;
}

const getScreenSize = () => {

    //initial values
    const screenSize: ScreenSize = {
        minWidth: 0,
        maxWidth: window.innerWidth,
        minHeight: 0,
        maxHeight:  window.innerHeight,
        circleRadius: 0,
        startBlur: 0,
        endBlur: 0,  
    };

    //Desktop
    if (window.innerWidth > 1800) {
        screenSize.circleRadius = 200;
        screenSize.startBlur = 500;
        screenSize.endBlur = 100;
    }


    // Laptop
    else if (window.innerWidth > 1024) {
        screenSize.circleRadius = 150;
        screenSize.startBlur = 300;
        screenSize.endBlur = 50;
    }

    // Tablet
    else if (window.innerWidth > 768) {
        screenSize.circleRadius = 100;
        screenSize.startBlur = 200;
        screenSize.endBlur = 10;
        
    }

    // Mobile
    else {
        screenSize.circleRadius = 50;
        screenSize.startBlur = 200;
        screenSize.endBlur = 100;
    }

    return screenSize;
}

const generateRandomPosition = (radius: number) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    const randomAngle = Math.random() * (2 * Math.PI);
    const randomTop = centerY + radius * Math.sin(randomAngle);
    const randomLeft = centerX + radius * Math.cos(randomAngle);

    return { top: randomTop, left: randomLeft };
};

export const initalWords = (): Word[] => {
    const newWords: Word[] = [];
    const screenSize = getScreenSize();

    const centralCircleRadius = screenSize.circleRadius;
    const outerCircleRadius = screenSize.circleRadius;

    for (let index = 0; index < 4; index++) {
        const radius = index % 2 === 0 ? centralCircleRadius : outerCircleRadius;
        const randomPosition = generateRandomPosition(radius);
        const newWord: Word = {
            text: `Word ${index + 1}`,
            top: randomPosition.top,
            left: randomPosition.left,
            scale: 4 - index,
            opacity: 0.6,
            blur: 0,
        };

        newWords.push(newWord);
    }

    return newWords;
};


export const addNewWord = (length: number): Word => {
    const screenSize = getScreenSize();

    const outerCircleRadius = screenSize.circleRadius;
    const randomPosition = generateRandomPosition(outerCircleRadius);
    const newWord: Word = {
        text: `Word ${length + 1}`,
        top: randomPosition.top,
        left: randomPosition.left,
        scale: 0.2,
        opacity: 0.6,
        blur: 2,
    };

    return newWord;
};

export const validateWordReachEndScreen = (word: Word, gapValue: number, screenSize: ScreenSize): boolean => {

    return ((word.left > screenSize.maxWidth - gapValue) ||  (word.left < screenSize.minWidth + gapValue) || (word.top > screenSize.maxHeight - gapValue) || (word.top < screenSize.minHeight + gapValue));
}


export const frontChange = (word: Word, zoom: number): Word => {

    const screenSize = getScreenSize();
    if(validateWordReachEndScreen(word, screenSize.endBlur, screenSize)){
        word.blur += zoom;
    }
    else if(validateWordReachEndScreen(word, screenSize.startBlur, screenSize)){
        word.blur = word.blur > 0.3 ? 0.3 : word.blur + zoom;
    }


    return word;
};

export const backChange = (word: Word, zoom: number): Word => {
    if (word.scale < 3) {
        word.blur = word.blur < 0 ? 0 : word.blur - zoom;
        word.opacity = word.opacity > 0.6 ? 0.6 : word.opacity + zoom;
    }

    return word;
};

export const positionChange = (word: Word, zoom: number): Word => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const dx = word.left - centerX;
    const dy = word.top - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const newDistance = distance + zoom * 60;
    const newTop = centerY + newDistance * Math.sin(angle);
    const newLeft = centerX + newDistance * Math.cos(angle);

    word.top = newTop;
    word.left = newLeft;

    return word;
};

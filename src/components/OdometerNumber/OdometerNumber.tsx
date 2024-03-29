import { useState, useEffect } from "react";
import Odometer from 'react-odometerjs';

export const OdometerNumber = () => {
    const [value, setValue] = useState(111);
    const [theme, setTheme] = useState(0);
    const [isDisplay, setIsDisplay] = useState(false);

    const listTheme = ["default", "car", "plaza", "slot-machine", "digital", "train-station"];


    const changeTheme = (index: number) => {
        setTheme(index);
        setIsDisplay(true);
    }

    console.log("theme", theme);

    useEffect(() => {
        const timeoutId = setTimeout(() => setValue(4321), 2000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    // return(<> <Odometer value={value} format="d" style={{ fontSize: "10em" }} theme={theme}/></>)

    return (
        <>
         <Odometer value={value} format="d" style={isDisplay ? { fontSize: "10em", cursor: 'pointer' } : { display: "none" }} theme={listTheme[0]} />
        <Odometer value={value} format="d" style={isDisplay ? { fontSize: "10em", cursor: 'pointer' } : { display: "none" }} theme={listTheme[1]} />
        <Odometer value={value} format="d" style={isDisplay ? { fontSize: "10em", cursor: 'pointer' } : { display: "none" }} theme={listTheme[2]} />
        <Odometer value={value} format="d" style={isDisplay ? { fontSize: "10em", cursor: 'pointer' } : { display: "none" }} theme={listTheme[3]} />
        <Odometer value={value} format="d" style={isDisplay ? { fontSize: "10em", cursor: 'pointer' } : { display: "none" }} theme={listTheme[4]} />
        <Odometer value={value} format="d" style={isDisplay ? { fontSize: "10em", cursor: 'pointer' } : { display: "none" }} theme={listTheme[5]} />
            <div className="theme-option">
                {listTheme.map((theme, index) => (
                    <button key={index} onClick={() => changeTheme(index)}>{theme}</button>
                ))}
            </div>
            <input type="number" onChange={(e) => setValue(parseInt(e.target.value))} />
        </>
    );
}

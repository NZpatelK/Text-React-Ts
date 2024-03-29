import { useState, useEffect } from "react";
import Odometer from 'react-odometerjs';

export const OdometerNumber = () => {
    const [value, setValue] = useState(111);
    const [theme, setTheme] = useState("digital");

    const listTheme = ["default",  "car", "plaza", "slot-machine", "digital", "train-station"];

    const changeTheme = (theme: string) => {
        setTheme(theme);
        console.log(theme);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => setValue(4321), 2000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div>
            <Odometer value={value} format="d" style={{ fontSize: "10em" }} theme={theme} />
            <div className="theme-option">
                {listTheme.map((theme, index) => (
                    <button key={index} onClick={() => changeTheme(theme)}>{theme}</button>
                ))}
            </div>
            <input type="number" onChange={(e) => setValue(parseInt(e.target.value))} />
        </div>
    );
}

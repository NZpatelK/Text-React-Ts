import { useState, useEffect } from "react";
import Odometer from 'react-odometerjs';
import './odometer-theme-car.css';
import './odometer-theme-plaza.css';
import './odometer-theme-slot-machine.css';
import './odometer-theme-digital.css';
import './odometer-theme-train-station.css';
import './odometer-theme-default.css';
import './OdometerNumber.css';


export const OdometerNumber = () => {
    const [values, setValues] = useState<number[]>([]);

    const listTheme = ["default", "car", "plaza", "slot-machine", "digital", "train-station"];


    useEffect(() => {
        const timeoutId = setTimeout(() => setValues([111, 1111, 1111, 1111, 1111, 1111]), 2000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const updateValue = (index: number, value: number) => {
        const newValue = [...values];
        newValue[index] = value;
        setValues(newValue);
    }

    return (
        <div className="odometerContainer">
            {listTheme.map((_, index) => (
                <div className="themeOption">
                    <Odometer value={values[index]} format="d" style={{ fontSize: "10em", cursor: 'pointer' }} theme={listTheme[index]} />
                    <div className="inputContainer" >
                        <h3>Input your new value to update Odometer</h3>
                        <input className="num-input" maxLength={4} onChange={(e) => updateValue(index, parseInt(e.target.value))} />
                    </div>
                </div>

            ))}
        </div>
    );
}

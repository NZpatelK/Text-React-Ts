import { useState, useEffect } from "react";
import Odometer from 'react-odometerjs';

export const OdometerNumber = () => {
    const [values, setValues] = useState<number[]>([]);

    const listTheme = ["default", "car", "plaza", "slot-machine", "digital", "train-station"];


    useEffect(() => {
        const timeoutId = setTimeout(() => setValues([1111, 1111, 1111, 1111, 1111, 1111]), 2000);
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
        <p>
            {listTheme.map((_, index) => (
                <>
                    <Odometer value={values[index]} format="d" style={{ fontSize: "10em", cursor: 'pointer' }} theme={listTheme[index]} />
                </>
                // <input type="number" onChange={(e) => updateValue(index,parseInt(e.target.value))} />

            ))}
        </p>
    );
}

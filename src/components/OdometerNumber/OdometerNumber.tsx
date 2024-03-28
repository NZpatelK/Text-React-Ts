import { useState, useEffect } from "react";
import Odometer from 'react-odometerjs';

export const OdometerNumber = () => {
    const [value, setValue] = useState(1234);

    useEffect(() => {
        const timeoutId = setTimeout(() => setValue(4321), 2000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return <Odometer value={value} format="(.ddd),dd" />;
}

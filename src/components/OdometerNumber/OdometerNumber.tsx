import { useState, useEffect } from "react";
import Odometer from 'react-odometerjs';

export const OdometerNumber = () => {
    const [value, setValue] = useState(111);

    useEffect(() => {
        const timeoutId = setTimeout(() => setValue(4321), 2000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return <Odometer value={value} format="d" style={{fontSize: "10em"}} theme="car" />;
}

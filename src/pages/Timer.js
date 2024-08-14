import { useEffect, useState } from "react";
import './style/HomePage.css'

export default function Timer() {
    const [min, setMin] = useState(1);
    const [sec, setSec] = useState(59);

    useEffect(() => {
        const interval = setInterval(() => {
            if (min === 0 && sec === 0) {
                clearInterval(interval);
            } else if (sec === 0) {
                setMin(min => min - 1);
                setSec(59);
            } else {
                setSec(sec => sec - 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <p className="text">Please wait for ONLY 2 MINUTES,<br/>
            application is loading on the server. It will start in<br/>
            &nbsp;&nbsp;{min}&nbsp;:{sec < 10 ? `0${sec}` : sec}&nbsp;&nbsp;</p>
        </>
    );
}

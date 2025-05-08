import { useEffect, useState } from "react";
import './style/HomePage.css'

export default function Timer() {
    const [min, setMin] = useState(1);
    const [sec, setSec] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setSec(prevSec => {
                if (prevSec === 0) {
                    setMin(prevMin => {
                        if (prevMin === 0) {
                            clearInterval(interval);
                            return 0;
                        }
                        return prevMin - 1;
                    });
                    return 59; // reset seconds to 59 when decreasing minute
                } else {
                    return prevSec - 1;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p className="text">Please wait for ONLY 2 MINUTES,<br/>
            application is loading on the server. It will start in<br/>
            {min}:{sec.toString().padStart(2, '0')}</p>
        </div>
    );
}

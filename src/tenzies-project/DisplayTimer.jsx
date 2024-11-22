import { useEffect, useState } from "react";

export function DisplayTimer({ start, hasUserWon }) {
    const [ displayTime, setDisplayTime ] = useState('0');

    useEffect(() => {
        function getSecondsElapsed() {
            return Math.floor((Date.now() - start) / 1000);
        }
        let clearTimer = null;

        if (start) {
            clearTimer = setInterval(() => {
                setDisplayTime(getSecondsElapsed())
            }, 1000)
        }

        if (hasUserWon) clearInterval(clearTimer);
        return () => {
            if (clearTimer) clearInterval(clearTimer);
        }
    }, [start, hasUserWon])

    
    return (
        <p>Time Elapsed: {displayTime}</p>
    )
}
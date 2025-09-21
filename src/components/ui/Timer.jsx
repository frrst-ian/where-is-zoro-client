import { useEffect, useState } from "react";

const Timer = ({ startTime, isActive, endTime }) => {
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    
    useEffect(() => {
        // If inactive and we have endTime, calculate final time once
        if (!isActive && endTime) {
            const finalElapsed = Math.floor((new Date(endTime) - new Date(startTime)) / 1000);
            setElapsedSeconds(finalElapsed);
            return;
        }
        
        // If inactive without endTime, stop
        if (!isActive) return;

        // Active timer - run interval
        const interval = setInterval(() => {
            const now = new Date();
            const elapsed = Math.floor((now - new Date(startTime)) / 1000);
            setElapsedSeconds(elapsed);
        }, 1000);
        
        return () => clearInterval(interval);
    }, [startTime, isActive, endTime]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return <div className="timer">{formatTime(elapsedSeconds)}</div>;
};

export default Timer;
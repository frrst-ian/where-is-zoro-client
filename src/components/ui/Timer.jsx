import { useEffect, useState } from "react";

const Timer = ({ startTime, isActive }) => {
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            const now = new Date();
            const elapsed = Math.floor((now - new Date(startTime)) / 1000);
            setElapsedSeconds(elapsed);
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime, isActive]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return <div className="timer">{formatTime(elapsedSeconds)}</div>;
};

export default Timer;

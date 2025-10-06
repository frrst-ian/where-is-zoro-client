import { useState, useEffect } from "react";
import Leaderboard from "../ui/Leaderboard";
import { getLeaderboard } from "../../services/gameApi";

const LeaderboardContainer = ({ onClose }) => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const data = await getLeaderboard();
                setScores(data);
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    return <Leaderboard scores={scores} loading={loading} onClose={onClose} />;
};

export default LeaderboardContainer;
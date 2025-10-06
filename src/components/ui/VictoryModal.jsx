import { Trophy, Clock } from "lucide-react";
import "../../styles/VictoryModal.css";

const VictoryModal = ({
    time,
    onSubmitScore,
    onPlayAgain,
    onViewLeaderboard,
    onClose
}) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="modal-overlay">
            <div className="victory-modal">
                <div className="victory-icon">
                    <Trophy size={64} />
                </div>
                <h1>Congratulations!</h1>
                <p>You found all characters!</p>

                <div className="time-display">
                    <Clock size={24} />
                    <span>{formatTime(time)}</span>
                </div>

                <div className="modal-actions">
                    <button
                        className="btn --btn-primary"
                        onClick={onSubmitScore}
                    >
                        Submit Score
                    </button>
                    <button
                        className="btn --btn-secondary"
                        onClick={onViewLeaderboard}
                    >
                        View Leaderboard
                    </button>
                    <button
                        className="btn --btn-tertiary"
                        onClick={onPlayAgain}
                    >
                        Play Again
                    </button>
                    <button className="btn --btn-tertiary" onClick={onClose}>
                        Back to Game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VictoryModal;

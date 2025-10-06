import { Trophy, Medal, Award, Clock, X, ArrowLeft } from "lucide-react";
import "../../styles/Leaderboard.css";

const Leaderboard = ({ scores, loading, onClose, onBack }) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const getRankIcon = (index) => {
        if (index === 0) return <Trophy size={24} className="rank-gold" />;
        if (index === 1) return <Medal size={24} className="rank-silver" />;
        if (index === 2) return <Award size={24} className="rank-bronze" />;
        return <span className="rank-number">{index + 1}</span>;
    };

    return (
        <div className="modal-overlay">
            <div className="leaderboard">
                <div className="leaderboard-header">
                    <Trophy size={32} />
                    <h2>Leaderboard</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {loading ? (
                    <div className="loading-state">Loading scores...</div>
                ) : scores.length === 0 ? (
                    <div className="empty-state">No scores yet. Be the first!</div>
                ) : (
                    <div className="scores-list">
                        {scores.map((score, index) => (
                            <div key={score.id} className={`score-item rank-${index + 1}`}>
                                <div className="rank-icon">{getRankIcon(index)}</div>
                                <div className="player-name">{score.playerName}</div>
                                <div className="score-time">
                                    <Clock size={16} />
                                    {formatTime(score.timeInSeconds)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {onBack && (
                    <button className="btn --btn-tertiary top-mrgin" onClick={onBack}>
                        <ArrowLeft size={20} />
                        Back 
                    </button>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
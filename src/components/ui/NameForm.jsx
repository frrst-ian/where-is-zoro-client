import { User, Trophy, Clock } from "lucide-react";
import "../../styles/NameForm.css";

const NameForm = ({ time, onSubmit, onCancel, submitting, error }) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="modal-overlay">
            <div className="name-form">
                <div className="name-form-header">
                    <Trophy size={48} />
                    <h2>Submit Your Score</h2>
                    <div className="time-badge">
                        <Clock size={18} />
                        <span>{formatTime(time)}</span>
                    </div>
                </div>

                {error && (
                    <div className="message-box message-error">{error}</div>
                )}

                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <User size={20} />
                        <input
                            type="text"
                            name="playerName"
                            placeholder="Enter your name"
                            maxLength={30}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn --btn-primary"
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Submit"}
                        </button>
                        <button
                            type="button"
                            className="btn --btn-tertiary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NameForm;

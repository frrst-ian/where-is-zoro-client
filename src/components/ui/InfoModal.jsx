import { X, Target, Clock, Trophy } from "lucide-react";
import "../../styles/InfoModal.css";

const InfoModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="info-modal">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="info-header">
          <Target size={48} />
          <h2>Where's Zoro?</h2>
          <p className="subtitle">A Waldo-inspired character finding game</p>
        </div>

        <div className="info-content">
          <section className="info-section">
            <h3>About the Game</h3>
            <p>
              Where's Zoro is a fun twist on the classic "Where's Waldo?" game. 
              Search through detailed one piece themed images to find hidden characters 
              as quickly as possible. Compete for the fastest time on the leaderboard!
            </p>
          </section>

          <section className="info-section">
            <h3>How to Play</h3>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Select an Image</h4>
                  <p>Choose from three different images to search</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Click to Search</h4>
                  <p>Click anywhere on the image where you think a character is hiding</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Select Character</h4>
                  <p>A menu will appear - choose which character you found</p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Beat the Clock</h4>
                  <p>Find all characters as fast as you can and submit your score!</p>
                </div>
              </div>
            </div>
          </section>

          <section className="info-section tips">
            <h3>Tips</h3>
            <ul>
              <li><Clock size={16} /> Your timer starts when you click "Play"</li>
              <li><Target size={16} /> Be precise - you need to click near the character</li>
              <li><Trophy size={16} /> Submit your score to compete on the leaderboard</li>
            </ul>
          </section>
        </div>

        <button className="btn --btn-primary" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
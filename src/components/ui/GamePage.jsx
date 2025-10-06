import GameImage from "./GameImage";
import TargetingBox from "./TargetingBox";
import Timer from "./Timer";
import ProgressTracker from "./ProgressTracker";
import Marker from "./Marker";
import { useState } from "react";

const GamePage = ({
  gameStatus,
  foundCharacters,
  onImageClick,
  loading,
  handleCharacterSelect,
  showTargetingBox,
  setShowTargetingBox,
  targetingPosition,
  message,
  sessionStartTime,
  markers,
  endTime,
  gameStarted,
  onStartGame,
  onPlayAgain,
}) => {
  const [imageRect, setImageRect] = useState(null);

  if (loading) {
    return <div className="loading">Loading game...</div>;
  }

  if (gameStatus === "error") {
    return <div className="error">Error loading game. Please try again.</div>;
  }

  if (!gameStarted) {
    return (
      <div className="play-btn">
        <button className="btn --btn-play" onClick={onStartGame}>
          Play
        </button>
      </div>
    );
  }

  return (
    <div className="gamePage">
      <Timer
        startTime={sessionStartTime}
        isActive={gameStatus === "playing"}
        endTime={endTime}
      />
      {message && (
        <div
          className={`message-box ${
            message.includes("Found")
              ? "message-success"
              : message.includes("Try again")
                ? "message-error"
                : ""
          }`}
        >
          {message}
        </div>
      )}

      <div className="gamePage_info">
        <div style={{ position: "relative" }}>
          <GameImage
            onImageClick={onImageClick}
            onImageLoad={(rect) => setImageRect(rect)}
          />
          {markers.map((marker, index) => (
            <Marker
              key={index}
              x={marker.x}
              y={marker.y}
              characterName={marker.name}
              imageRect={imageRect}
            />
          ))}
          {showTargetingBox && (
            <TargetingBox
              position={targetingPosition}
              onCharacterSelect={handleCharacterSelect}
              onCancel={() => setShowTargetingBox(false)}
            />
          )}
        </div>
        <div className="left">
          <ProgressTracker foundCharacters={foundCharacters} />
          <button className="btn --btn-tertiary --btn-blue" onClick={onPlayAgain}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;

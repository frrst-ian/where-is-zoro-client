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
}) => {
  const [imageRect, setImageRect] = useState(null);

  if (loading) {
    return <div>Loading game...</div>;
  }

  if (gameStatus === "error") {
    return <div>Error loading game. Please try again.</div>;
  }

  if (gameStatus === "completed") {
    return (
      <div className="completion-screen">
        <h1>Congratulations!</h1>
        <p>You found all characters!</p>
        <Timer
          startTime={sessionStartTime}
          isActive={false}
          endTime={endTime}
        />
      </div>
    );
  }

  return (
    <div className="gamePage">
      <h1>Where's Zoro</h1>
      <Timer
        startTime={sessionStartTime}
        isActive={gameStatus === "playing"}
        endTime={endTime}
      />
      {message && <div className="message">{message}</div>}

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
        <ProgressTracker foundCharacters={foundCharacters} />
      </div>
    </div>
  );
};

export default GamePage;

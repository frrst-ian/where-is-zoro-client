import GameImage from "./GameImage";
import TargetingBox from "./TargetingBox";
import Timer from "./Timer";
import ProgressTracker from "./ProgressTracker";
import Marker from "./Marker";
import ImageSelector from "./ImageSelector";
import { useState } from "react";
import { Hourglass } from "lucide-react";

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
  selectedImage,
  setSelectedImage,
}) => {
  const [imageRect, setImageRect] = useState(null);

  const images = [
    { id: 1, name: "Where's Wally x One Piece", src: "/images/one_peak.png" },
  ];

  if (loading) {
    return <div className="loading">Loading game...</div>;
  }

  if (gameStatus === "error") {
    return <div className="error">Error loading game. Please try again.</div>;
  }

  if (!gameStarted) {
    return (
      <div className="play-btn-container">
        <ImageSelector
          images={images}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />

        <button className="btn --btn-play" onClick={onStartGame}>
          Play
        </button>
      </div>
    );
  }

  return (
    <div className="gamePage">
      <div
        className={`timer-container ${
          foundCharacters.length === 4 ? "stopped" : ""
        }`}
      >
        <Hourglass size={24} className="hourglass" />
        <Timer
          startTime={sessionStartTime}
          isActive={gameStatus === "playing"}
          endTime={endTime}
        />
      </div>

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
            imageSrc={images.find((img) => img.id === selectedImage)?.src}
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
          <button
            className="btn --btn-tertiary --btn-blue"
            onClick={onPlayAgain}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;

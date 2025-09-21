import GameImage from "./GameImage";
import TargetingBox from "./TargetingBox";
import Timer from "./Timer";
import ProgressTracker from "./ProgressTracker";

const GamePage = ({
  sessionId,
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
}) => {
  if (loading) {
    return <div>Loading game...</div>;
  }

  if (gameStatus === "error") {
    return <div>Error loading game. Please try again.</div>;
  }

  return (
    <div className="gamePage">
      <h1>Where's Zoro</h1>
      <Timer startTime={sessionStartTime} isActive={gameStatus === "playing"} />
      {message && <div className="message">{message}</div>}

      <div className="gamePage_info">
        <ProgressTracker foundCharacters={foundCharacters} />
        <GameImage onImageClick={onImageClick} />
        {showTargetingBox && (
          <TargetingBox
            position={targetingPosition}
            onCharacterSelect={handleCharacterSelect}
            onCancel={() => setShowTargetingBox(false)}
          />
        )}
      </div>
    </div>
  );
};

export default GamePage;

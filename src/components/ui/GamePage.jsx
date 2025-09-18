import GameImage from "./GameImage";

const GamePage = ({
  sessionId,
  gameStatus,
  foundCharacters,
  onImageClick,
  loading,
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
      <div className="gamePage_info">
        <p>Session: {sessionId}</p>
        <p>Found characters: {foundCharacters.length}/2</p>
        <GameImage onImageClick={onImageClick} />
      </div>
    </div>
  );
};

export default GamePage;

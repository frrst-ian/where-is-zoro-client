import { useState, useEffect } from "react";
import {
  createGameSession,
  validateCharacterClick,
} from "../../services/gameApi";
import GamePage from "../ui/GamePage";

const GamePageContainer = () => {
  // State management
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [gameStatus, setGameStatus] = useState("loading");
  const [loading, setLoading] = useState(false);
  const [showTargetingBox, setShowTargetingBox] = useState(false);
  const [targetingPosition, setTargetingPosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("");

  // Initialize game session on mount
  useEffect(() => {
    const initializeGame = async () => {
      try {
        setLoading(true);
        const session = await createGameSession();
        setSessionId(session.sessionId);
        setStartTime(session.startTime);
        setGameStatus("playing");
      } catch (error) {
        console.error("Failed to create session: ", error);
        setGameStatus("error");
      } finally {
        setLoading(false);
      }
    };

    initializeGame();
  }, []);

  const handleImageClick = async (clickData) => {
    console.log("Clicked at: ", clickData.x, clickData.y);
    setShowTargetingBox(true);
    setTargetingPosition({ x: clickData.x, y: clickData.y });
  };

  const handleCharacterSelect = async (character) => {
    const result = await validateCharacterClick({
      clickX: targetingPosition.x,
      clickY: targetingPosition.y,
      characterId: character.id,
    });

    console.log("API result:", result);

    try {
      if (result.success) {
        const newFoundCharacters = [...foundCharacters, result.character];
        setFoundCharacters(newFoundCharacters);

        setMessage(`Found ${result.character.name}!`);
        if (newFoundCharacters.length >= 2) {
          setGameStatus("completed");
        }

        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Try again!");

        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Validation failed: ", error);
    }
    setShowTargetingBox(false);
  };

  return (
    <GamePage
      sessionId={sessionId}
      gameStatus={gameStatus}
      foundCharacters={foundCharacters}
      onImageClick={handleImageClick}
      loading={loading}
      handleCharacterSelect={handleCharacterSelect}
      showTargetingBox={showTargetingBox}
      setShowTargetingBox={setShowTargetingBox}
      targetingPosition={targetingPosition}
      setTargetingPosition={setTargetingPosition}
      message={message}
      sessionStartTime={startTime}
    />
  );
};

export default GamePageContainer;

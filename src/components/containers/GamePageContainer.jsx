import { useState, useEffect } from "react";
import Marker from "../ui/Marker";
import {
  createGameSession,
  validateCharacterClick,
  completeGameSession
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
  const [markers, setMarkers] = useState([]);

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

    if (result.success) {
      // Add marker
      const newMarker = {
        x: targetingPosition.x,
        y: targetingPosition.y,
        name: result.character.name,
      };
      setMarkers([...markers, newMarker]);

      // Update found characters
      const newFoundCharacters = [...foundCharacters, result.character];
      setFoundCharacters(newFoundCharacters);
      setMessage(`Found ${result.character.name}!`);

      // CHECK GAME COMPLETION
      if (newFoundCharacters.length >= 2) {
        setGameStatus("completed");
        try {
          await completeGameSession(sessionId);
          setMessage("Game Complete! Well done!");
        } catch (error) {
          console.error("Failed to complete session:", error);
        }
      } else {
        setTimeout(() => setMessage(""), 3000);
      }
    } else {
      setMessage("Try again!");
      setTimeout(() => setMessage(""), 3000);
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
      markers={markers}
    />
  );
};

export default GamePageContainer;

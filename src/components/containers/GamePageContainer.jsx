import { useState, useEffect } from "react";
import Marker from "../ui/Marker";
import {
  createGameSession,
  validateCharacterClick,
  completeGameSession,
} from "../../services/gameApi";
import GamePage from "../ui/GamePage";

const GamePageContainer = () => {
  // State management
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [gameStatus, setGameStatus] = useState("loading");
  const [loading, setLoading] = useState(false);
  const [showTargetingBox, setShowTargetingBox] = useState(false);
  const [targetingPosition, setTargetingPosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 }); // Add this
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
    console.log("Clicked at display: ", clickData.display);
    console.log("Normalized coordinates: ", clickData.normalized);
    
    setShowTargetingBox(true);
    setTargetingPosition(clickData.display); // For UI positioning
    setNormalizedPosition(clickData.normalized); // For backend validation
  };

  const handleCharacterSelect = async (character) => {
    console.log("Sending to backend:", {
      clickX: normalizedPosition.x,
      clickY: normalizedPosition.y,
      characterId: character.id,
    });

    const result = await validateCharacterClick({
      clickX: normalizedPosition.x, // Use normalized coordinates
      clickY: normalizedPosition.y, // Use normalized coordinates
      characterId: character.id,
    });

    if (result.success) {
      // Check if character already found
      const isAlreadyFound = foundCharacters.some(
        (foundChar) => foundChar.id === result.character.id,
      );

      if (isAlreadyFound) {
        setMessage(`${result.character.name} already found!`);
        setTimeout(() => setMessage(""), 3000);
        setShowTargetingBox(false);
        return; // Exit early - don't add duplicate
      }

      // Add marker for new character (use display coordinates for visual positioning)
      const newMarker = {
        x: targetingPosition.x,
        y: targetingPosition.y,
        name: result.character.name,
      };
      setMarkers([...markers, newMarker]);

      // Update found characters with new unique character
      const newFoundCharacters = [...foundCharacters, result.character];
      setFoundCharacters(newFoundCharacters);
      setMessage(`Found ${result.character.name}!`);

      // Check game completion with updated count
      if (newFoundCharacters.length >= 2) {
        const completionTime = new Date();
        setEndTime(completionTime);
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
      endTime={endTime}
    />
  );
};

export default GamePageContainer;
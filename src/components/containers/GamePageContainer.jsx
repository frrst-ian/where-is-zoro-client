import { useState, useEffect } from "react";
import { createGameSession } from "../../services/gameApi";
import GamePage from "../ui/GamePage";

const GamePageContainer = () => {
  // State management
  const [sessionId, setSessionId] = useState(null);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [gameStatus, setGameStatus] = useState("loading");
  const [loading, setLoading] = useState(false);

  // Initialize game session on mount
  useEffect(() => {
    const initializeGame = async () => {
      try {
        setLoading(true);
        const session = await createGameSession();
        setSessionId(session.sessionId);
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
  };

  return (
    <GamePage
      sessionId={sessionId}
      gameStatus={gameStatus}
      foundCharacters={foundCharacters}
      onImageClick={handleImageClick}
      loading={loading}
    />
  );
};

export default GamePageContainer;

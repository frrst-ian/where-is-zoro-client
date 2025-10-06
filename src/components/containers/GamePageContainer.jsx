import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../../context/UserContext";
import {
  createGameSession,
  validateCharacterClick,
  completeGameSession,
} from "../../services/gameApi";
import GamePage from "../ui/GamePage";
import VictoryModal from "../ui/VictoryModal";
import NameForm from "../ui/NameForm";
import LeaderboardContainer from "./LeaderboardContainer";
import { submitScore } from "../../services/gameApi";

const GamePageContainer = () => {
  const { user } = useContext(UserContext); // Get current user

  // State management
  const [sessionId, setSessionId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [gameStatus, setGameStatus] = useState("loading");
  const [loading, setLoading] = useState(false);
  const [showTargetingBox, setShowTargetingBox] = useState(false);
  const [targetingPosition, setTargetingPosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("");
  const [markers, setMarkers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [finalTime, setFinalTime] = useState(0);
  const [selectedImage, setSelectedImage] = useState(1);

  // Generate user-specific localStorage key
  const getStorageKey = useCallback(() => {
    return user ? `activeSession_${user.id}` : null;
  }, [user]);

  // Load saved session for current user
  useEffect(() => {
    if (!user) return; // Wait for user to be loaded

    const storageKey = `activeSession_${user.id}`;
    const savedSession = localStorage.getItem(storageKey);

    if (savedSession) {
      try {
        const {
          sessionId,
          startTime,
          foundCharacters: savedCharacters,
          markers: savedMarkers,
        } = JSON.parse(savedSession);

        console.log("Restored session for user:", user.id);
        console.log("Session ID:", sessionId);
        console.log("Start time:", startTime);

        setSessionId(sessionId);
        setStartTime(startTime);
        setFoundCharacters(savedCharacters || []);
        setMarkers(savedMarkers || []);
        setGameStarted(true);
        setGameStatus("playing");
      } catch (error) {
        console.error("Failed to restore session:", error);
        localStorage.removeItem(storageKey);
      }
    }
  }, [user]);

  // Initialize game session on mount
  useEffect(() => {
    if (!gameStarted || sessionId) return;

    const initializeGame = async () => {
      try {
        setLoading(true);
        const session = await createGameSession(selectedImage);
        setSessionId(session.sessionId);
        setStartTime(session.startTime);

        const storageKey = getStorageKey();
        if (storageKey) {
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              sessionId: session.sessionId,
              startTime: session.startTime,
              foundCharacters: [],
              markers: [],
            }),
          );
        }

        setGameStatus("playing");
      } catch (error) {
        console.error("Failed to create session: ", error);
        setGameStatus("error");
      } finally {
        setLoading(false);
      }
    };

    initializeGame();
  }, [gameStarted, sessionId, getStorageKey, selectedImage]);

  const handleRestart = () => {
    // Clear user-specific localStorage
    const storageKey = getStorageKey();
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }

    setShowVictory(false);
    setShowNameForm(false);
    setShowLeaderboard(false);

    // Reset all state
    setSessionId(null);
    setStartTime(null);
    setEndTime(null);
    setFoundCharacters([]);
    setMarkers([]);
    setGameStarted(false);
    setGameStatus("loading");
    setMessage("");
  };

  const handleSubmitScore = () => {
    setShowVictory(false);

    if (user && !user.isGuest) {
      // Auto-submit for logged-in users
      handleAutoSubmit(user.username);
    } else {
      // Show form for guests
      setShowNameForm(true);
    }
  };

  const handleAutoSubmit = async (username) => {
    setSubmitting(true);
    try {
      console.log("Submitting score:", { sessionId, username });
      const result = await submitScore(sessionId, username);
      console.log("Score submitted:", result);
      setShowLeaderboard(true);
    } catch (error) {
      console.error("Submit error:", error.message);
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      await submitScore(sessionId, e.target.playerName.value);
      setShowNameForm(false);
      setShowLeaderboard(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageClick = async (clickData) => {
    console.log("Clicked at display: ", clickData.display);
    console.log("Normalized coordinates: ", clickData.normalized);

    setShowTargetingBox(true);
    setTargetingPosition(clickData.display);
    setNormalizedPosition(clickData.normalized);
  };

  const handleCharacterSelect = async (character) => {
    console.log("Sending to backend:", {
      clickX: normalizedPosition.x,
      clickY: normalizedPosition.y,
      characterId: character.id,
    });

    const result = await validateCharacterClick({
      clickX: normalizedPosition.x,
      clickY: normalizedPosition.y,
      characterId: character.id,
    });

    if (result.success) {
      const isAlreadyFound = foundCharacters.some(
        (foundChar) => foundChar.id === result.character.id,
      );

      if (isAlreadyFound) {
        setMessage(`${result.character.name} already found!`);
        setTimeout(() => setMessage(""), 3000);
        setShowTargetingBox(false);
        return;
      }

      const newMarker = {
        x: normalizedPosition.x,
        y: normalizedPosition.y,
        name: result.character.name,
      };
      setMarkers([...markers, newMarker]);

      const newFoundCharacters = [...foundCharacters, result.character];
      setFoundCharacters(newFoundCharacters);
      setMessage(`Found ${result.character.name}!`);

      // Save to user-specific localStorage
      const storageKey = getStorageKey();
      if (storageKey) {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            sessionId,
            startTime,
            foundCharacters: newFoundCharacters,
            markers: [...markers, newMarker],
          }),
        );
      }

      if (newFoundCharacters.length >= 4) {
        const completionTime = new Date();
        const timeInSeconds = Math.floor(
          (completionTime - new Date(startTime)) / 1000,
        );
        setFinalTime(timeInSeconds);
        setEndTime(completionTime);
        setGameStatus("completed");
        setShowVictory(true);

        try {
          await completeGameSession(sessionId);
          const storageKey = getStorageKey();
          if (storageKey) {
            localStorage.removeItem(storageKey);
          }
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
    <>
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
        gameStarted={gameStarted}
        onStartGame={() => setGameStarted(true)}
        onPlayAgain={handleRestart}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

      {showVictory && (
        <VictoryModal
          time={finalTime}
          onSubmitScore={handleSubmitScore}
          onPlayAgain={handleRestart}
          onViewLeaderboard={() => {
            setShowVictory(false);
            setShowLeaderboard(true);
          }}
        />
      )}

      {showNameForm && (
        <NameForm
          time={finalTime}
          onSubmit={handleNameSubmit}
          onCancel={() => setShowNameForm(false)}
          submitting={submitting}
          error={submitError}
        />
      )}

      {showLeaderboard && (
        <LeaderboardContainer onClose={() => setShowLeaderboard(false)} />
      )}
    </>
  );
};

export default GamePageContainer;

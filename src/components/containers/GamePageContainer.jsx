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
  const { user } = useContext(UserContext);

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
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const getStorageKey = useCallback(() => {
    return user ? `activeSession_${user.id}` : null;
  }, [user]);

  useEffect(() => {
    if (!user) return;

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

        setSessionId(sessionId);
        setStartTime(startTime);
        setFoundCharacters(savedCharacters || []);
        setMarkers(savedMarkers || []);
        setGameStarted(true);
        setGameStatus("playing");
      } catch (error) {
        localStorage.removeItem(storageKey);
      }
    }
  }, [user]);

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
        setGameStatus("error");
      } finally {
        setLoading(false);
      }
    };

    initializeGame();
  }, [gameStarted, sessionId, getStorageKey, selectedImage]);

  const handleRestart = () => {
    const storageKey = getStorageKey();
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }

    setShowVictory(false);
    setShowNameForm(false);
    setShowLeaderboard(false);
    setScoreSubmitted(false);

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
      handleAutoSubmit(user.username);
    } else {
      setShowNameForm(true);
    }
  };

  const handleAutoSubmit = async () => {
    setSubmitting(true);
    try {setMessage("");
      setScoreSubmitted(true);
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
      setMessage("");
      setScoreSubmitted(true);
      setShowLeaderboard(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageClick = async (clickData) => {

    setShowTargetingBox(true);
    setTargetingPosition(clickData.display);
    setNormalizedPosition(clickData.normalized);
  };

  const handleCharacterSelect = async (character) => {
    try {
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
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Connection error. Please check your internet!");
      setTimeout(() => setMessage(""), 5000);
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
        <LeaderboardContainer
          onClose={() => {
            setShowLeaderboard(false);
            setMessage("");
          }}
          onBack={
            scoreSubmitted
              ? null
              : () => {
                  setShowLeaderboard(false);
                  setShowVictory(true);
                }
          }
        />
      )}
    </>
  );
};

export default GamePageContainer;

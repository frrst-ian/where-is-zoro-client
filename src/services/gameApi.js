// Base configuration
const BASE_URL = "http://localhost:3000";

// Session management functions
async function createGameSession() {
    // POST to /sessions
    // Return: { sessionId, startTime }
    const sessionData = await makeApiCall("sessions", "POST", null);
    return sessionData;
}

async function getGameSession(sessionId) {
    // GET to /sessions/:sessionId
    // Return: session data with progress
    const gameSession = await makeApiCall(`sessions/${sessionId}`, "GET", null);

    return gameSession;
}

async function completeGameSession(sessionId) {
    // PUT to /sessions/:sessionId/complete
    // Return: completion data with total time
    const gameSession = await makeApiCall(
        `sessions/${sessionId}/complete`,
        "PUT",
        null,
    );
    return gameSession;
}

// Game Interaction Functions
async function validateCharacterClick(clickData) {
    // POST to /game/validate-click
    // Send: { clickX, clickY, characterId }
    // Return: { success: boolean, character?: object }
    const characterClick = await makeApiCall(
        "game/validate-click",
        "POST",
        clickData,
    );
    return characterClick;
}

async function makeApiCall(endpoint, method, data) {
    try {
        const fetchOptions = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        // Only add body for non-GET requests
        if (method !== "GET" && data) {
            fetchOptions.body = JSON.stringify(data);
        }

        const res = await fetch(`${BASE_URL}/${endpoint}`, fetchOptions);
        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.error || "API request failed");
        }

        return responseData;
    } catch (error) {
        console.error("API Error: ", error.message);
        throw error;
    }
}

export {
    createGameSession,
    getGameSession,
    completeGameSession,
    validateCharacterClick,
};

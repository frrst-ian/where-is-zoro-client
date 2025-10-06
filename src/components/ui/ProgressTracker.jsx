const ProgressTracker = ({ foundCharacters }) => {
    const allCharacters = [
        { id: 1, name: "Zoro" },
        { id: 2, name: "Luffy" },
        { id: 3, name: "Sanji" },
        { id: 4, name: "Nami" },
    ];

    const foundCount = foundCharacters.length;
    const totalCount = allCharacters.length;
    const remainingCharacters = allCharacters.filter(
        (char) => !foundCharacters.some((found) => found.id === char.id),
    );

    return (
        <div className="progress-tracker">
            {/* COUNT */}
            <div className="progress-count">
                Found: {foundCount}/{totalCount}
            </div>

            {/* FOUND LIST */}
            <div className="found-section">
                <h4>Found:</h4>
                {foundCharacters.map((char) => (
                    <div key={char.id} className="character-item found">
                        {char.name} ✓
                    </div>
                ))}
            </div>

            {/* REMAINING LIST */}
            <div className="remaining-section">
                <h4>Still Looking:</h4>
                {remainingCharacters.map((char) => (
                    <div key={char.id} className="character-item remaining">
                        {char.name} ?
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressTracker;

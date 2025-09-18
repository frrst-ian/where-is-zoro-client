const TargetingBox = ({ position, onCharacterSelect, onCancel }) => {
    return (
        <div
            className="targetingBox"
            style={{ position: "absolute", left: position.x, top: position.y }}
        >
            <select onChange={(e) => onCharacterSelect({ id: e.target.value })}>
                <option value="">Choose character...</option>
                <option value="1">Zoro</option>
                <option value="2">Luffy</option>
            </select>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default TargetingBox;

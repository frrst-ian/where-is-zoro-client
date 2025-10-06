const TargetingBox = ({ position, onCharacterSelect, onCancel }) => {
  const boxWidth = 150;
  const boxHeight = 80;
  const { innerWidth, innerHeight } = window;

  let left = position.x;
  let top = position.y;

  // Only center if screen is 1024px wide or less
  if (innerWidth <= 1024) {
    left = position.x - boxWidth / 2;
    top = position.y - boxHeight / 2;

    // keep it on-screen
    left = Math.max(0, Math.min(left, innerWidth - boxWidth));
    top = Math.max(0, Math.min(top, innerHeight - boxHeight));
  }

  return (
    <div className="targetingBox" style={{ position: "absolute", left, top }}>
      <select onChange={(e) => onCharacterSelect({ id: e.target.value })}>
        <option value="">Choose character...</option>
        <option value="1">Luffy</option>
        <option value="2">Zoro</option>
        <option value="3">Sanji</option>
        <option value="4">Nami</option>
      </select>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default TargetingBox;

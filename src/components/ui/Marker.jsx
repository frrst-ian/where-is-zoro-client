const Marker = ({ x, y, characterName, imageRect }) => {
  const displayX = imageRect
    ? (x / imageRect.naturalWidth) * imageRect.displayWidth
    : x;
  const displayY = imageRect
    ? (y / imageRect.naturalHeight) * imageRect.displayHeight
    : y;
  return (
    <div
      style={{
        position: "absolute",
        left: displayX - 20,
        top: displayY - 10,
        background: "#9e2bc9",
        color: "#f8f9fa",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "0.75rem",
        pointerEvents: "none",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}
    >
      ✓ {characterName}
    </div>
  );
};

export default Marker;

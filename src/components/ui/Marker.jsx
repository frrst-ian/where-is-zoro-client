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
        background: "green",
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        pointerEvents: "none",
        border: "2px solid white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}
    >
      ✓ {characterName}
    </div>
  );
};

export default Marker;

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
        background: "black",
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "0.75rem",
        pointerEvents: "none",
      }}
    >
      ✓ {characterName}
    </div>
  );
};

export default Marker;

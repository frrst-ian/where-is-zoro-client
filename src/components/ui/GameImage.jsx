const GameImage = ({ onImageClick }) => {
    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const displayedWidth = event.target.clientWidth;
        const displayedHeight = event.target.clientHeight;

        // Define original image size (where coordinates were stored)
        const ORIGINAL_WIDTH = 1200; // Replace with actual
        const ORIGINAL_HEIGHT = 800; // Replace with actual

        // Normalize to original scale
        const normalizedX = (x / displayedWidth) * ORIGINAL_WIDTH;
        const normalizedY = (y / displayedHeight) * ORIGINAL_HEIGHT;

        onImageClick({
            normalized: { x: normalizedX, y: normalizedY },
            display: { x: x, y: y },
        });
    };

    return (
        <div className="gameImage">
            <img
                src="/images/op.png"
                alt="Where's Zoro Game"
                onClick={handleClick}
                className="gameImage_image"
            />
        </div>
    );
};

export default GameImage;

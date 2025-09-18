const GameImage = ({ onImageClick }) => {
    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        onImageClick({ x, y });
    };

    return (
        <div className="gameImage">
            <img
                src="/images/op.jpg"
                alt="Where's Zoro Game"
                onClick={handleClick}
                className="gameImage_image"
            />
        </div>
    );
};

export default GameImage;

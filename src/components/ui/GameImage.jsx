import { useState, useRef } from "react";

const GameImage = ({ onImageClick, onImageLoad, imageSrc }) => {
    const [imageInfo, setImageInfo] = useState(null);
    const imgRef = useRef(null);

    const handleImageLoad = (event) => {
        const img = event.target;
        const info = {
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            displayWidth: img.clientWidth,
            displayHeight: img.clientHeight,
            offsetWidth: img.offsetWidth,
            offsetHeight: img.offsetHeight,
        };
        setImageInfo(info);
        onImageLoad?.(info);
    };

    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const displayedWidth = rect.width;
        const displayedHeight = rect.height;

        const naturalWidth = event.target.naturalWidth;
        const naturalHeight = event.target.naturalHeight;


        const normalizedX = (x / displayedWidth) * naturalWidth;
        const normalizedY = (y / displayedHeight) * naturalHeight;

        onImageClick({
            normalized: { x: normalizedX, y: normalizedY },
            display: { x: x, y: y },
        });
    };

    return (
        <div className="gameImage">
            <img
                ref={imgRef}
                src={imageSrc}
                alt="Game Image"
                onLoad={handleImageLoad}
                onClick={handleClick}
                className="gameImage_image"
            />
        </div>
    );
};

export default GameImage;

import { useState, useRef } from 'react';

const GameImage = ({ onImageClick }) => {
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
            offsetHeight: img.offsetHeight
        };
        setImageInfo(info);
        console.log('=== IMAGE LOAD INFO ===');
        console.log('Natural size (actual image):', img.naturalWidth, 'x', img.naturalHeight);
        console.log('Client size (displayed):', img.clientWidth, 'x', img.clientHeight);
        console.log('Offset size:', img.offsetWidth, 'x', img.offsetHeight);
        console.log('=====================');
    };

    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const displayedWidth = event.target.clientWidth;
        const displayedHeight = event.target.clientHeight;
        
        // Get actual natural dimensions from the loaded image
        const naturalWidth = event.target.naturalWidth;
        const naturalHeight = event.target.naturalHeight;

        if (!naturalWidth || !naturalHeight) {
            console.error('Image not fully loaded or dimensions unavailable');
            return;
        }

        // Normalize to actual original scale
        const normalizedX = (x / displayedWidth) * naturalWidth;
        const normalizedY = (y / displayedHeight) * naturalHeight;

        console.log('=== CLICK DEBUG ===');
        console.log('Display click:', { x, y });
        console.log('Image displayed size:', { width: displayedWidth, height: displayedHeight });
        console.log('Image natural size:', { width: naturalWidth, height: naturalHeight });
        console.log('Scale factors:', { 
            xScale: displayedWidth / naturalWidth, 
            yScale: displayedHeight / naturalHeight 
        });
        console.log('Normalized click:', { x: normalizedX, y: normalizedY });
        console.log('=================');

        onImageClick({
            normalized: { x: normalizedX, y: normalizedY },
            display: { x: x, y: y },
        });
    };

    return (
        <div className="gameImage">
            {imageInfo && (
                <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    background: 'rgba(0,0,0,0.7)', 
                    color: 'white', 
                    padding: '5px',
                    fontSize: '12px',
                    zIndex: 1000 
                }}>
                    Natural: {imageInfo.naturalWidth}x{imageInfo.naturalHeight} | 
                    Display: {imageInfo.displayWidth}x{imageInfo.displayHeight}
                </div>
            )}
            <img
                ref={imgRef}
                src="/images/op.png"
                alt="Where's Zoro Game"
                onLoad={handleImageLoad}
                onClick={handleClick}
                className="gameImage_image"
            />
        </div>
    );
};

export default GameImage;
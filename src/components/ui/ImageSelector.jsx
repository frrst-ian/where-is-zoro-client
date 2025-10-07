const ImageSelector = ({ images, selectedImage, onSelectImage }) => {
  return (
    <div className="image-selector">
      <div className="image-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className={`image-option ${selectedImage === image.id ? "selected" : ""}`}
            onClick={() => onSelectImage(image.id)}
          >
            <img src={image.src} alt={image.name} />
            <span className="image-name">{image.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;
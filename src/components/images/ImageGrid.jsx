import ImageCard from "./ImageCard";

const ImageGrid = ({ images, onToggleFavorites, isFavorite }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-3">
        {images.map((img, idx) => (
          <ImageCard
            key={img.id || idx}
            img={img}
            onToggleFavorites={onToggleFavorites}
            isFavorite={isFavorite(img.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;

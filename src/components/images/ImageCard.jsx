import { Download, Heart, Eye } from "lucide-react";

const ImageCard = ({ img, onToggleFavorites, isFavorite }) => {

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = img.largeImageURL || img.webformatURL;
    link.download = `pixabay-${img.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group relative break-inside-avoid mb-4">
      <div className="relative overflow-hidden rounded-lg bg-zinc-800">

        {/* Image */}
        <img
          src={img.webformatURL}
          alt={img.tags}
          loading="lazy"
          className="w-full h-auto transition-transform duration-500 sm:group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="
          absolute inset-0
          bg-linear-to-t from-black/80 via-black/30 to-transparent
          opacity-100 sm:opacity-0 sm:group-hover:opacity-100
          transition
        ">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex justify-between items-center">

              {/* User */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {img.user.charAt(0).toUpperCase()}
                </div>
                <span className="text-white text-sm">{img.user}</span>
              </div>

              {/* Stats */}
              <div className="flex gap-3 text-white text-xs">
                <span className="flex items-center gap-1">
                  <Heart size={12} className="text-red-400" />
                  {img.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={12} className="text-blue-400" />
                  {img.views}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Download */}
        <button
          onClick={handleDownload}
          className="
            absolute top-2 right-2
            bg-black/60 backdrop-blur p-2 rounded-md
            opacity-100 sm:opacity-0 sm:group-hover:opacity-100
            transition
          "
        >
          <Download size={16} className="text-white" />
        </button>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorites(img);
          }}
          className="
            absolute top-2 left-2
            bg-black/60 backdrop-blur p-2 rounded-md
            opacity-100 sm:opacity-0 sm:group-hover:opacity-100
            transition
          "
        >
          <Heart
            size={16}
            fill={isFavorite ? "currentColor" : "none"}
            className={isFavorite ? "text-red-500" : "text-white"}
          />
        </button>

      </div>
    </div>
  );
};

export default ImageCard;

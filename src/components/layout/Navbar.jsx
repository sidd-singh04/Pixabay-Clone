import { Camera, Search, Heart } from "lucide-react";

const Navbar = ({ query, setQuery, onSearch, favorites, showFavorites, setShowFavorites }) => {
  return (
    <nav className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between h-auto sm:h-16 py-3 sm:py-0 gap-3 sm:gap-0">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Camera className="text-violet-500" size={24} />
            <span className="text-xl font-bold text-white">Pixabay</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 w-full sm:max-w-xl mx-0 sm:mx-8">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="Search Images...."
                className="w-full bg-zinc-800/80 text-white pl-10 pr-20 py-2 rounded-lg border border-zinc-700/50 focus:outline-none"
              />
              <button
                onClick={onSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-linear-to-r from-violet-600 to-purple-600 text-white px-4 py-1 rounded-md cursor-pointer"
              >
                Go
              </button>
            </div>
          </div>

          {/* Favorites Button */}
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="relative flex items-center justify-center bg-linear-to-r from-violet-600 to-purple-600 text-white px-5 py-2 rounded-lg cursor-pointer"
          >
            <Heart
              className="inline-block text-sm font-medium mr-1.5"
              size={16}
              fill={showFavorites ? "currentColor" : "none"}
            />
            Favourites
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

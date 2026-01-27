import Navbar from "./components/layout/Navbar";
import Categories from "./components/layout/Categories";
import ImageGrid from "./components/images/ImageGrid";
import useImageFetch from "./hooks/useImageFetch";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { useFavorites } from "./hooks/useFavorite";
import FavoritesHeader from "./components/ui/FavoritesHeader";

const App = () => {
  const [query, setQuery] = useState();
  const [showFavorites, setShowFavorites] = useState(false);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const {
    images,
    loading,
    loadingMore,
    hasMore,
    fetchImages,
    resetImages,
  } = useImageFetch();

  // Fetch images when query changes
  useEffect(() => {
    if (query) {
      fetchImages(query, 1, false);
    }
  }, [query]);

  const handleSearch = () => {
    if (!query.trim()) return;

    resetImages();
    fetchImages(query, 1, false);
    setShowFavorites(false);
  };

  const handleCategoryClick = (cat) => {
    const searchTerm = cat === "Trending" ? "nature" : cat;
    setQuery(searchTerm);
    resetImages();
    fetchImages(searchTerm, 1, false);
    setShowFavorites(false);
  };

  const displayImages = showFavorites ? favorites : images;

  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        favorites={favorites}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

      {/* Hide categories in favorites view */}
      {!showFavorites && (
        <Categories handleCategoryClick={handleCategoryClick} />
      )}

      {showFavorites && (
        <FavoritesHeader
          count={favorites.length}
          onBack={() => setShowFavorites(false)}
        />
      )}

      {/* Empty Favorites State */}
      {showFavorites && favorites.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          No favorites added yet ❤️
        </p>
      )}

      {!showFavorites && loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ImageGrid
            images={displayImages}
            onToggleFavorites={toggleFavorite}
            isFavorite={isFavorite}
          />

          {loadingMore && !showFavorites && (
            <div className="flex flex-col items-center py-12">
              <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
              <p className="mt-3 text-gray-500 text-sm">
                Loading more...
              </p>
            </div>
          )}

          {!hasMore && images.length > 0 && !showFavorites && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-sm">
                That’s all for now 👋
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

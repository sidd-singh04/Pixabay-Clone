const FavoritesHeader = ({ count, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto mt-5 mb-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          My Favorites ({count})
        </h2>

        <button
          onClick={onBack}
          className="self-start sm:self-auto text-gray-400 hover:text-white transition text-sm"
        >
          ← Back to Search
        </button>

      </div>
    </div>
  );
};

export default FavoritesHeader;

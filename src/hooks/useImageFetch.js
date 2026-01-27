import { useState } from "react";
import { PixabayService } from "../services/pixabay.service";
import { ENV } from "../config/env";

const useImageFetch = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (searchQuery, pageNum = 1) => {
    setLoading(true);
    setError(null);

    try {
      const data = await PixabayService.fetchImages(
        searchQuery,
        pageNum,
        ENV.PER_PAGE_INITIAL
      );

      if (data.hits && data.hits.length > 0) {
        setImages(data.hits);
        setHasMore(data.hits.length === ENV.PER_PAGE_INITIAL);
      } else {
        setImages([]);
        setHasMore(false);
        setError("No Images Found");
      }
    } catch (err) {
      setError(err.message);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const resetImages = () => {
    setImages([]);
    setHasMore(true);
  };

  return { images, loading, error, hasMore, fetchImages, resetImages };
};

export default useImageFetch;

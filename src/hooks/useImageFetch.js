import React, { useState } from "react";
import {PixabayService} from '../services/pixabay.service'
import { ENV } from "../config/env";

const useImageFetch = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (searchQuery, pageNum = 1, append = true) => {
    //For Creating Delay
    if (append) {
      setLoadingMore(true);
      await new Promise((resolve) => setTimeout(resolve, ENV.LOAD_MORE_DELAY),);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
        const perPage = append ? ENV.PER_PAGE_LOAD_MORE : ENV.PAGE_PER_INITIAL

        const data = await PixabayService.fetchImages(searchQuery, pageNum, perPage);
        if(data.hits && data.hits.length > 0){
            if(append){
                setImages(prev => [...prev, ...data.hits])
            }else{
                 setImages(data.hits);
            }
           setHasMore(data.hits.length === perPage);
        }else{
            setError("No Images Found");
            setHasMore(false);
        }
    } catch (err) {
        setError(err.message);
        setHasMore(false);
    } finally{
        setLoading(false);
        setLoadingMore(false);
    }

  };

  const resetImages = ()=>{
    setImages([]);
    setLoadingMore(true);
  }
  return {images, loading, loadingMore, error, hasMore, fetchImages, resetImages}
};

export default useImageFetch;






import { useState } from "react";
import { StorageService } from "../services/storage.service";
import { STORAGE_KEY } from "../config/env";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    return StorageService.get(STORAGE_KEY) || [];
  });

  const toggleFavorite = (img) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.id === img.id);

      const newFavorites = isFavorite
        ? prev.filter((fav) => fav.id !== img.id)
        : [...prev, img];

        StorageService.set(STORAGE_KEY, newFavorites)
        return newFavorites;
    });
  };

  const isFavorite = (imgId) => favorites.some(fav => fav.id === imgId)

  return {favorites, toggleFavorite, isFavorite}

};
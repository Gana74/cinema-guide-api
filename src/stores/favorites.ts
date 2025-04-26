import { defineStore } from "pinia";
import axios from "axios";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [] as any[], // Список избранных фильмов
  }),
  actions: {
    async fetchFavorites() {
      try {
        const response = await axios.get(
          "https://cinemaguide.skillbox.cc/favorites"
        );
        this.favorites = response.data; // Обновляем список избранных фильмов
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      }
    },
    async addFavorite(movieId: number) {
      try {
        await axios.post("https://cinemaguide.skillbox.cc/favorites", {
          id: movieId.toString(),
        });
        await this.fetchFavorites(); // Обновляем список избранных фильмов
      } catch (error) {
        console.error("Failed to add favorite", error);
      }
    },
    async removeFavorite(movieId: number) {
      try {
        await axios.delete(
          `https://cinemaguide.skillbox.cc/favorites/${movieId.toString()}`
        );
        // Удаляем фильм из локального списка
        this.favorites = this.favorites.filter((movie) => movie.id !== movieId);
      } catch (error) {
        console.error("Failed to remove favorite", error);
      }
    },
  },
});

<template>
  <div>
    <h1>{{ movie.title }}</h1>
    <MovieCard :movie="movie" />
    <button @click="toggleFavorite">
      {{ isFavorite ? "Remove from Favorites" : "Add to Favorites" }}
    </button>
    <button @click="showTrailer">Трейлер</button>
    <Modal v-if="showModal" @close="showModal = false">
      <iframe :src="movie.trailerUrl" frameborder="0" allowfullscreen></iframe>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { useFavoritesStore } from "../stores/favorites";
import MovieCard from "../components/MovieCard.vue";
import Modal from "../components/Modal.vue";

export default defineComponent({
  components: {
    MovieCard,
    Modal,
  },
  data() {
    return {
      movie: {} as any,
      showModal: false,
      isFavorite: false,
    };
  },
  methods: {
    async fetchMovie() {
      const response = await axios.get(
        `https://cinemaguide.skillbox.cc/movie/${this.$route.params.id}`
      );
      this.movie = response.data;
      this.checkFavorite();
    },
    async checkFavorite() {
      const favoritesStore = useFavoritesStore();
      await favoritesStore.fetchFavorites();
      this.isFavorite = favoritesStore.favorites.some(
        (fav: any) => fav.id === this.movie.id
      );
    },
    toggleFavorite() {
      const favoritesStore = useFavoritesStore();
      if (this.isFavorite) {
        favoritesStore.removeFavorite(this.movie.id);
      } else {
        favoritesStore.addFavorite(this.movie.id);
      }
      this.isFavorite = !this.isFavorite;
    },
    showTrailer() {
      this.showModal = true;
    },
  },
  mounted() {
    this.fetchMovie();
  },
});
</script>

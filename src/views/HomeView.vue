<template>
  <div class="home">
    <div class="movie">
      <div class="movie__info">
        <div class="movie__info-rating rating flex">
          <div
            v-if="randomMovie.tmdbRating"
            :class="[
              'rating__box',
              getRatingClass(randomMovie.tmdbRating).class,
            ]"
            class="flex"
          >
            <span class="rating__star">
              <svg
                width="16.000000"
                height="16.000000"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <clipPath id="clip1_297">
                    <rect
                      id="icon / star"
                      rx="0.000000"
                      width="15.000000"
                      height="15.000000"
                      transform="translate(0.500000 0.500000)"
                      fill="white"
                      fill-opacity="0"
                    />
                  </clipPath>
                </defs>
                <rect
                  id="icon / star"
                  rx="0.000000"
                  width="15.000000"
                  height="15.000000"
                  transform="translate(0.500000 0.500000)"
                  fill="#FFFFFF"
                  fill-opacity="0"
                />
                <g clip-path="url(#clip1_297)">
                  <path
                    id="Vector"
                    d="M8 12.17L3.29 14.8L4.34 9.51L0.39 5.86L5.74 5.22L8 0.33L10.25 5.22L15.6 5.86L11.65 9.51L12.7 14.8L8 12.17Z"
                    fill="#FFFFFF"
                    fill-opacity="1.000000"
                    fill-rule="nonzero"
                  />
                </g>
              </svg>
            </span>
            <p class="rating__value">
              {{ getRatingClass(randomMovie.tmdbRating).rating }}
            </p>
          </div>
          <p class="movie__info-data">
            {{ randomMovie.releaseYear }}
          </p>
          <p class="movie__info-genres">
            {{ randomMovie.genres ? randomMovie.genres.join(", ") : "" }}
          </p>

          <p class="movie__info-runtime">
            {{ formatDuration(randomMovie.runtime) }}
          </p>
        </div>

        <h1 class="movie__info-title">
          {{ randomMovie.title }}
        </h1>

        <p class="movie__info-plot">{{ randomMovie.plot }}</p>
        <div class="movie__info-buttons bt">
          <button class="bt__trailer" @click="showTrailer">Трейлер</button>
          <button class="bt__details" @click="goToMovieDetails">
            О фильме
          </button>

          <button class="bt__favorite" @click="toggleFavorite">
            <svg
              v-if="isFavorite"
              width="20.000000"
              height="18.500000"
              viewBox="0 0 20 18.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs />
              <path
                id="Vector"
                d="M14.5 0C17.53 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35 0 9 1 10 2C11 1 12.64 0 14.5 0Z"
                fill="#B3A8FF"
                fill-opacity="1.000000"
                fill-rule="nonzero"
              />
            </svg>
            <svg
              v-else
              width="20.000000"
              height="18.500000"
              viewBox="0 0 20 18.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs />
              <path
                id="Vector"
                d="M14.5 0C17.53 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.93 15.6C11.81 15.04 12.6 14.49 13.35 13.9C16.33 11.53 18 8.94 18 6C18 3.64 16.46 2 14.5 2C13.42 2 12.25 2.56 11.41 3.41L10 4.82L8.58 3.41C7.74 2.56 6.57 2 5.5 2C3.55 2 2 3.65 2 6C2 8.94 3.66 11.53 6.64 13.9C7.39 14.49 8.18 15.04 9.06 15.6C9.36 15.79 9.66 15.97 10 16.17C10.33 15.97 10.63 15.79 10.93 15.6Z"
                fill="#FFFFFF"
                fill-opacity="1.000000"
                fill-rule="nonzero"
              />
            </svg>
          </button>
          <button class="bt__random" @click="fetchRandomMovie">
            <svg
              width="20.000000"
              height="20.000000"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs />
              <path
                id="Vector"
                d="M10 2C12.74 2 15.17 3.38 16.61 5.5L14 5.5L14 7.5L20 7.5L20 1.5L18 1.5L18 3.99C16.17 1.57 13.27 0 10 0C4.47 0 0 4.47 0 10L2 10C2 5.58 5.58 2 10 2ZM18 10C18 14.41 14.41 18 10 18C7.25 18 4.82 16.61 3.38 14.5L6 14.5L6 12.5L0 12.5L0 18.5L2 18.5L2 16C3.82 18.42 6.72 20 10 20C15.52 20 20 15.52 20 10L18 10Z"
                fill="#FFFFFF"
                fill-opacity="1.000000"
                fill-rule="nonzero"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="movie__poster">
        <img
          v-if="randomMovie.posterUrl"
          :src="randomMovie.posterUrl"
          :alt="randomMovie.title"
          class="movie__poster-img"
        />
        <div v-else class="movie__poster-placeholder">No Poster Available</div>
      </div>
    </div>

    <div class="top">
      <h2 class="top__title">Топ 10 фильмов</h2>
      <MovieList :movies="topMovies" :showIndex="true" />
    </div>

    <Modal v-if="showModal" @close="showModal = false" class="modal">
      <div v-if="modalContent === 'trailer'" class="modal__content">
        <iframe
          v-if="randomMovie.trailerYoutubeId"
          :src="`https://www.youtube.com/embed/${randomMovie.trailerYoutubeId}`"
          frameborder="0"
          allowfullscreen
          class="modal__iframe"
        ></iframe>
        <p v-else class="modal__no-trailer">Трейлер отсутствует.</p>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject } from "vue";
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";
import MovieList from "../components/MovieList.vue";
import Modal from "../components/Modal.vue";
import { useFavoritesStore } from "../stores/favorites";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    MovieCard,
    MovieList,
    Modal,
  },
  setup() {
    const randomMovie = ref<any>({
      genres: [],
    });
    const topMovies = ref<any[]>([]);
    const showModal = ref(false);
    const modalContent = ref("");
    const favoritesStore = useFavoritesStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const isFavorite = computed(() => {
      return favoritesStore.favorites.some(
        (fav: any) => fav.id === randomMovie.value.id
      );
    });

    // Получаем метод showAuthModal через inject
    const showAuthModal = inject<() => void>("showAuthModal");

    const fetchRandomMovie = async () => {
      try {
        const response = await axios.get(
          "https://cinemaguide.skillbox.cc/movie/random"
        );
        randomMovie.value = response.data;
        checkFavorite();
      } catch (error) {
        console.error("Failed to fetch random movie", error);
      }
    };

    const fetchTopMovies = async () => {
      try {
        const response = await axios.get(
          "https://cinemaguide.skillbox.cc/movie/top10"
        );
        topMovies.value = response.data;
      } catch (error) {
        console.error("Failed to fetch top movies", error);
      }
    };

    const checkFavorite = async () => {
      if (authStore.isAuthenticated) {
        await favoritesStore.fetchFavorites();
      }
    };

    const toggleFavorite = async () => {
      if (!authStore.isAuthenticated) {
        if (showAuthModal) {
          showAuthModal();
        }
        return;
      }

      if (isFavorite.value) {
        await favoritesStore.removeFavorite(randomMovie.value.id);
      } else {
        await favoritesStore.addFavorite(randomMovie.value.id);
      }

      checkFavorite();
    };

    const showTrailer = () => {
      modalContent.value = "trailer";
      showModal.value = true;
    };

    const goToMovieDetails = () => {
      router.push({
        name: "movieDetails",
        params: { id: randomMovie.value.id },
      });
    };

    const formatDuration = (duration: number) => {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}ч. ${minutes}м.`;
    };

    const getRatingClass = (rating: number) => {
      const formattedRating =
        rating % 1 === 0 ? rating.toString() : rating.toFixed(1);

      if (rating >= 8 && rating <= 10) {
        return { class: "rating__box-gold", rating: formattedRating };
      } else if (rating >= 7 && rating < 8) {
        return { class: "rating__box-green", rating: formattedRating };
      } else if (rating >= 5 && rating < 7) {
        return { class: "rating__box-gray", rating: formattedRating };
      } else {
        return { class: "rating__box-red", rating: formattedRating };
      }
    };

    const formatRating = (rating: number) => {
      return rating.toFixed(1);
    };

    fetchRandomMovie();
    fetchTopMovies();

    return {
      randomMovie,
      topMovies,
      showModal,
      modalContent,
      isFavorite,
      fetchRandomMovie,
      toggleFavorite,
      showTrailer,
      goToMovieDetails,
      formatDuration,
      formatRating,
      getRatingClass,
    };
  },
});
</script>

<style scoped>
.home {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.movie {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  margin-bottom: 45px;
  margin-top: 30px;
}

.movie__info {
  width: 100%;
  width: 600px;
  /* margin-top: 75px; */
  text-align: left;
}

.movie__info-data,
.movie__info-genres {
  margin-right: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}

.movie__info-runtime {
  margin-right: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}

.movie__info-rating {
  margin-bottom: 16px;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.movie__info-title {
  margin-bottom: 16px;
  margin-right: 40px;

  color: rgb(255, 255, 255);
  font-size: 48px;
  font-weight: 700;
}

.movie__info-plot {
  margin-bottom: 16px;
  margin-right: 40px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 24px;
  font-weight: 400;
}

.rating__value {
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 700;
}

.rating__star {
  width: 16px;
  height: 16px;
  margin-right: 2px;
}

.rating__box {
  width: 70px;
  height: 32px;
  margin-right: 16px;
  border-radius: 16px;
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.rating__box-gold {
  background-color: gold;
}

.rating__box-green {
  background-color: green;
}

.rating__box-gray {
  background-color: gray;
}

.rating__box-red {
  background-color: red;
}

.movie__info-button {
  margin-right: 40px;
}

.bt__trailer {
  width: 157px;
  height: 56px;
  margin-right: 16px;
  margin-bottom: 10px;
  border-radius: 28px;
  border: none;
  background: rgb(103, 165, 235);
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 700;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.bt__trailer:hover {
  background: rgb(69, 82, 110);
  color: rgba(255, 255, 255, 0.5);
}

.bt__details {
  width: 172px;
  height: 56px;
  margin-right: 16px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 28px;
  background: rgb(57, 59, 60);
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-family: Play;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.bt__details:hover {
  border: 1px solid rgba(0, 0, 0, 0.4);
  background: rgb(116, 116, 116);
  color: rgba(255, 255, 255, 0.5);
}

.bt__random,
.bt__favorite {
  width: 54px;
  height: 56px;
  margin-right: 16px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 28px;
  background: rgb(51, 51, 51);
}

.bt__random svg {
  fill: white;
}

.bt__random:hover svg path,
.bt__favorite:hover svg path {
  fill: rgba(255, 255, 255, 0.5);
}

.bt__random:hover,
.bt__favorite:hover {
  background: rgb(116, 116, 116);
  color: rgba(255, 255, 255, 0.5);
}

.movie__poster {
  max-width: 680px;
  /* max-height: 552px; */
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.movie__poster-placeholder {
  width: 100%;
  height: 336px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #f0f0f0;
  color: #888;
  border-radius: 5px;
}

.top__title {
  color: rgb(255, 255, 255);
  font-size: 40px;
  font-weight: 700;
  text-align: start;
}

.modal__no-trailer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 10px;
  width: 320px;
  min-height: 60px;
  border-radius: 24px;
  background: rgb(255, 255, 255);
  color: black;
}

@media (max-width: 1200px) {
  .movie__info {
    /* max-width: 510px; */
    /* width: 100%; */
    margin-right: 20px;
  }

  .movie__info-rating {
    margin-right: 0;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  .movie__info-title {
    margin-right: 0;
    font-size: 45px;
  }

  .movie__info-plot {
    margin-right: 0;
    font-size: 20px;
  }

  .movie__info-buttons {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    gap: 20px;
  }

  .bt__trailer,
  .bt__details,
  .bt__favorite,
  .bt__random {
    margin-right: 0px;
  }

  .bt__trailer,
  .bt__details {
    width: 190px;
  }

  .top__title {
    font-size: 35px;
  }
}
@media (max-width: 1024px) {
  .movie {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .movie__info {
    -webkit-box-ordinal-group: 6;
    -ms-flex-order: 5;
    order: 5;
    margin-right: 0;
    margin-top: 30px;
  }

  .movie__poster {
    /* min-width: 400px; */
  }
}

@media (max-width: 900px) {
  .movie__info {
    /* margin-top: 0; */
  }

  .movie__info-rating {
    gap: 5px;
  }

  .movie__info-title {
    font-size: 40px;
  }

  .movie__info-plot {
    font-size: 18px;
  }

  .bt__favorite,
  .bt__random {
    height: 50px;
    width: 45px;
  }

  .bt__trailer,
  .bt__details {
    height: 50px;
    width: 128px;
  }
}
/* 
@media (max-width: 799px) {
  .movie__poster {
    max-width: -webkit-max-content;
    max-width: -moz-max-content;
    max-width: max-content;
    max-height: 429px;
  }
} */

@media (max-width: 799px) {
  .movie {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    margin-top: 0;
    margin-bottom: 55px;
  }

  .movie__info {
    width: 100%;
    margin-top: 24px;
    -webkit-box-ordinal-group: 6;
    -ms-flex-order: 5;
    order: 5;
  }

  .movie__poster {
    max-width: -webkit-max-content;
    max-width: -moz-max-content;
    max-width: max-content;
    /* max-height: 429px; */
    /* max-width: 464px; */
    /* max-height: 230px; */
  }

  .movie__info-rating {
    margin: 0;
  }

  .movie__info-title {
    margin: 12px 0;
    font-size: 24px;
  }

  .movie__info-runtime {
    margin-right: 0;
    font-size: 14px;
  }

  .movie__info-genres,
  .movie__info-data {
    font-size: 14px;
  }

  .movie__info-plot {
    margin-right: 0;
    font-size: 18px;
  }

  .movie__info-buttons {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .bt__trailer {
    margin-bottom: 16px;
  }

  .bt__details {
    width: 140px;
  }

  .top {
    /* padding-left: 20px; */
    width: 100%;
  }

  .top__title {
    font-size: 24px;
  }
}

@media (max-width: 380px) {
  .bt__trailer {
    width: 309px;
    height: 56px;
    margin-right: 0px;
  }

  .bt__random {
    margin-right: 0;
  }
}
</style>

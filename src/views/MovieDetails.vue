<template>
  <div>
    <div class="movie">
      <div class="movie__info">
        <div class="movie__info-rating rating flex">
          <div
            v-if="movie.tmdbRating"
            :class="['rating__box', getRatingClass(movie.tmdbRating).class]"
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
              {{ getRatingClass(movie.tmdbRating).rating }}
            </p>
          </div>
          <p class="movie__info-data">
            {{ movie.releaseYear }}
          </p>
          <p class="movie__info-genres">
            {{ movie.genres ? movie.genres.join(", ") : "" }}
          </p>

          <p class="movie__info-runtime">
            {{ formatDuration(movie.runtime) }}
          </p>
        </div>

        <h1 class="movie__info-title">
          {{ movie.title }}
        </h1>

        <p class="movie__info-plot">{{ movie.plot }}</p>
        <div class="movie__info-buttons bt">
          <button class="bt__trailer" @click="showTrailer">Трейлер</button>

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
        </div>
      </div>
      <div class="movie__poster">
        <img
          v-if="movie.posterUrl"
          :src="movie.posterUrl"
          :alt="movie.title"
          class="movie__poster-img"
        />
        <div v-else class="movie__poster-placeholder">No Poster Available</div>
      </div>
    </div>

    <div>
      <div class="info">
        <h2 class="info__title">О фильме</h2>
        <p class="info__item">
          <span class="info__item-desktop"
            >Язык оригинала.........................................</span
          ><span class="info__item-mobile">Язык оригинала</span>

          {{
            movie.languages && movie.languages.length > 0
              ? movie.languages.join(", ")
              : "n/a"
          }}
        </p>
        <p class="info__item">
          <span class="info__item-desktop"
            >Бюджет........................................................</span
          ><span class="info__item-mobile">Бюджет</span>

          {{ movie.budget || "n/a" }}
        </p>
        <p class="info__item">
          <span class="info__item-desktop"
            >Выручка......................................................</span
          ><span class="info__item-mobile">Выручка</span>

          {{ movie.revenue || "n/a" }}
        </p>
        <p class="info__item">
          <span class="info__item-desktop"
            >Режиссёр.....................................................</span
          ><span class="info__item-mobile">Режиссёр</span>

          {{ movie.director || "n/a" }}
        </p>
        <p class="info__item">
          <span class="info__item-desktop"
            >Продакшен.................................................</span
          ><span class="info__item-mobile">Продакшен</span>

          {{ movie.production || "n/a" }}
        </p>
        <p class="info__item">
          <span class="info__item-desktop"
            >Награды......................................................</span
          ><span class="info__item-mobile">Награды</span>

          {{ movie.awardsSummary || "n/a" }}
        </p>
      </div>
    </div>

    <Modal v-if="showModal" @close="showModal = false">
      <div v-if="modalContent === 'trailer'" class="trailer">
        <iframe
          v-if="movie.trailerYoutubeId"
          :src="`https://www.youtube.com/embed/${movie.trailerYoutubeId}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <p class="trailer__info" v-else>Трейлер отсутствует</p>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject, watch } from "vue";
import axios from "axios";
import Modal from "../components/Modal.vue";
import { useFavoritesStore } from "../stores/favorites";
import { useAuthStore } from "../stores/auth";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    Modal,
  },
  setup() {
    const movie = ref<any>({
      genres: [],
    });
    const showModal = ref(false);
    const modalContent = ref("");
    const favoritesStore = useFavoritesStore();
    const authStore = useAuthStore();
    const isFavorite = computed(() => {
      return favoritesStore.favorites.some(
        (fav: any) => fav.id === movie.value.id
      );
    });

    // Получаем метод showAuthModal через inject
    const showAuthModal = inject<() => void>("showAuthModal");

    const fetchMovieDetails = async (id: string) => {
      try {
        const response = await axios.get(
          `https://cinemaguide.skillbox.cc/movie/${id}`
        );
        movie.value = response.data;
        checkFavorite();
      } catch (error) {
        console.error("Failed to fetch movie details", error);
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
        await favoritesStore.removeFavorite(movie.value.id);
      } else {
        await favoritesStore.addFavorite(movie.value.id);
      }

      checkFavorite();
    };

    const showTrailer = () => {
      modalContent.value = "trailer";
      showModal.value = true;
    };

    const showFullDescription = () => {
      modalContent.value = "description";
      showModal.value = true;
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
    const formatDuration = (duration: number) => {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours} ч ${minutes} мин`;
    };
    const formatRating = (rating: number) => {
      return rating.toFixed(1);
    };

    // Получаем id фильма из параметров маршрута
    const route = useRoute();
    const movieId = route.params.id as string;
    fetchMovieDetails(movieId);

    // Отслеживаем изменения параметров маршрута
    watch(
      () => route.params.id,
      (newId) => {
        if (newId) {
          fetchMovieDetails(newId as string);
        }
      }
    );

    return {
      movie,
      showModal,
      modalContent,
      isFavorite,
      toggleFavorite,
      showTrailer,
      showFullDescription,
      getRatingClass,
      formatRating,
      formatDuration,
    };
  },
});
</script>

<style scoped>
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
  /* max-width: 760px; */
  width: 100%;
  margin-top: 75px;
  text-align: left;
}

.movie__info-data,
.movie__info-runtime,
.movie__info-genres {
  margin-right: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}

.movie__info-rating {
  max-width: 550px;
  margin-bottom: 16px;
  margin-right: 40px;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
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

.bt__favorite {
  width: 54px;
  height: 56px;
  margin-right: 16px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 28px;
  background: rgb(51, 51, 51);
}

.bt__favorite:hover svg path {
  fill: rgba(255, 255, 255, 0.5);
}

.bt__favorite:hover {
  background: rgb(116, 116, 116);
  color: rgba(255, 255, 255, 0.5);
}

.movie__poster {
  /* max-width: 680px; */
  /* max-height: 552px; */
  width: 100%;
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

.info {
  margin-bottom: 119px;
  text-align: left;
}

.info__title {
  margin-bottom: 67px;
  color: rgb(255, 255, 255);
  font-size: 38px;
  font-weight: 700;
}

.info__item {
  margin-bottom: 28px;
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 400;
}

.info__item-desktop {
  display: inline;
}

.info__item-mobile {
  display: none;
}

.trailer {
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
}

.trailer__info {
  color: #000;
}

@media (max-width: 900px) {
  .movie__poster {
    min-width: 300px;
    max-height: 455px;
  }

  .movie__info-data,
  .movie__info-runtime,
  .movie__info-genres,
  .rating__value {
    font-size: 14px;
  }

  .movie__info-title {
    font-size: 40px;
  }

  .movie__info-plot {
    font-size: 18px;
  }

  .info__title {
    margin-bottom: 24px;
    font-size: 31px;
  }
}

@media (max-width: 799px) {
  .movie {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .movie__info {
    -webkit-box-ordinal-group: 3;
    -ms-flex-order: 2;
    order: 2;
    margin-top: 24px;
  }
}

@media (max-width: 500px) {
  .movie__poster {
    max-height: 260px;
  }

  .rating {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: 0;
  }

  .movie__info-title {
    margin-right: 0;
    font-size: 24px;
    font-weight: 700;
  }

  .movie__info-plot {
    margin-right: 0;
    font-size: 18px;
    font-weight: 400;
  }

  .bt__trailer {
    width: 225px;
  }

  .info {
    margin-bottom: 32px;
  }

  .info__title {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }

  .info__item {
    margin-bottom: 12px;
  }

  .info__item-desktop {
    display: none;
  }

  .info__item-mobile {
    display: block;
    margin-bottom: 4px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }

  .movie__info-buttons {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
}
</style>

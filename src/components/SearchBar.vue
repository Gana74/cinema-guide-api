<template>
  <div class="search">
    <div class="search__bar">
      <svg
        v-show="isMobile && !isSearchVisible"
        class="search__bar-icon-mobile"
        width="20"
        height="20"
        viewBox="0 0 20.3135 20.3137"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="toggleSearch"
      >
        <path
          id="Vector"
          d="M16.03 14.61L20.31 18.89L18.9 20.31L14.61 16.03C13.07 17.26 11.12 18 9 18C4.03 18 0 13.96 0 9C0 4.03 4.03 0 9 0C13.96 0 18 4.03 18 9C18 11.12 17.26 13.07 16.03 14.61ZM14.02 13.87C15.24 12.61 16 10.89 16 9C16 5.13 12.86 2 9 2C5.13 2 2 5.13 2 9C2 12.86 5.13 16 9 16C10.89 16 12.61 15.24 13.87 14.02L14.02 13.87Z"
          fill="#FFFFFF"
          fill-opacity="1.000000"
          fill-rule="nonzero"
        />
      </svg>

      <div v-show="!isMobile || isSearchVisible" class="search__input-wrapper">
        <svg
          class="search__bar-icon"
          width="20"
          height="20"
          viewBox="0 0 20.3137 20.3137"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.03 14.61L20.31 18.89L18.89 20.31L14.61 16.03C13.07 17.26 11.12 18 9 18C4.03 18 0 13.96 0 9C0 4.03 4.03 0 9 0C13.96 0 18 4.03 18 9C18 11.12 17.26 13.07 16.03 14.61ZM14.02 13.87C15.24 12.61 16 10.89 16 9C16 5.13 12.86 2 9 2C5.13 2 2 5.13 2 9C2 12.86 5.13 16 9 16C10.89 16 12.61 15.24 13.87 14.02L14.02 13.87Z"
            fill="#FFFFFF"
            fill-opacity="0.5"
          />
        </svg>
        <input
          class="search__bar-input"
          v-model="query"
          type="text"
          placeholder="Поиск"
          @input="handleInput"
        />
        <svg
          v-if="query"
          class="search__bar-clear"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="clearInput"
        >
          <path
            d="M11.99 10.58L16.94 5.63L18.36 7.05L13.41 12L18.36 16.95L16.94 18.36L11.99 13.41L7.04 18.36L5.63 16.95L10.58 12L5.63 7.05L7.04 5.63L11.99 10.58Z"
            fill="#FFFFFF"
            fill-opacity="0.5"
          />
        </svg>
      </div>
    </div>
    <ul
      v-if="results.length > 0 && query && (!isMobile || isSearchVisible)"
      class="search__result"
    >
      <li
        v-for="movie in results"
        :key="movie.id"
        @click="goToMovie(movie.id)"
        class="search__result-items result"
      >
        <div class="result__info flex">
          <img
            :src="movie.posterUrl"
            :alt="movie.title"
            class="result__info-poster"
          />
          <div class="result__info-detals info-detals">
            <ul class="details flex">
              <li class="details__item">
                <div
                  v-if="movie.tmdbRating"
                  :class="['rating__box', getRatingClass(movie.tmdbRating)]"
                  class="flex rating"
                >
                  <span class="rating__star"
                    ><svg
                      width="9.510742"
                      height="9.045044"
                      viewBox="0 0 9.51074 9.04504"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <desc>Created with Pixso.</desc>
                      <defs />
                      <path
                        id="Vector"
                        d="M4.75 7.4L1.81 9.04L2.47 5.74L0 3.45L3.34 3.05L4.75 0L6.16 3.05L9.51 3.45L7.03 5.74L7.69 9.04L4.75 7.4Z"
                        fill="#FFFFFF"
                        fill-opacity="1.000000"
                        fill-rule="nonzero"
                      />
                    </svg>
                  </span>
                  <p class="rating__value">
                    {{ formatRating(movie.tmdbRating) }}
                  </p>
                </div>
              </li>
              <li class="details__item">{{ movie.releaseYear }}</li>
              <li class="details__item">
                {{ movie.genres.join(", ") }}
              </li>
              <li class="details__item">
                {{ formatDuration(movie.runtime) }}
              </li>
            </ul>
            <h3 class="info-detals__title">{{ movie.title }}</h3>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const query = ref("");
    const results = ref<any[]>([]);
    const router = useRouter();
    const isSearchVisible = ref(false);
    const isMobile = ref(window.innerWidth < 800);

    const handleInput = async () => {
      if (query.value) {
        try {
          const response = await axios.get(
            `https://cinemaguide.skillbox.cc/movie?title=${query.value}`
          );
          results.value = response.data.slice(0, 5);
        } catch (error) {
          console.error("Search failed", error);
        }
      } else {
        results.value = [];
      }
    };

    const goToMovie = (movieId: number) => {
      router.push(`/movie/${movieId}`);
      query.value = "";
      results.value = [];
    };

    const clearInput = () => {
      query.value = "";
      results.value = [];
    };

    const toggleSearch = () => {
      isSearchVisible.value = !isSearchVisible.value;
      if (!isSearchVisible.value) {
        results.value = []; // Очищаем результаты при закрытии инпута
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const searchBar = document.querySelector(".search__bar");
      if (searchBar && !searchBar.contains(event.target as Node)) {
        isSearchVisible.value = false;
        results.value = []; // Очищаем результаты при клике вне области
      }
    };

    const formatDuration = (duration: number) => {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}ч. ${minutes}м.`;
    };

    const getRatingClass = (rating: number) => {
      if (rating >= 8 && rating <= 10) {
        return "rating__box-gold";
      } else if (rating >= 7 && rating < 8) {
        return "rating__box-green";
      } else if (rating >= 5 && rating < 7) {
        return "rating__box-gray";
      } else {
        return "rating__box-red";
      }
    };

    const formatRating = (rating: number) => {
      return rating.toFixed(1);
    };

    onMounted(() => {
      window.addEventListener("resize", () => {
        isMobile.value = window.innerWidth < 800;
      });
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    watch(query, () => {
      if (!query.value) {
        results.value = [];
      }
    });

    watch(isSearchVisible, (newValue) => {
      if (!newValue) {
        results.value = []; // Очищаем результаты при скрытии инпута
      }
    });

    return {
      query,
      results,
      isSearchVisible,
      isMobile,
      handleInput,
      goToMovie,
      clearInput,
      toggleSearch,
      formatDuration,
      getRatingClass,
      formatRating,
    };
  },
});
</script>

<style scoped>
.search {
  position: relative;
  margin-right: 40px;
  max-width: 653px;
  width: 100%;
}

.search__bar {
  position: relative;
  display: inline-block;
  width: 100%;
}

.search__input-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
}

.search__bar-icon-mobile {
  cursor: pointer;
  width: 20px;
  height: 20px;
  -webkit-transition: opacity 0.3s ease;
  -o-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}

.search__bar-input {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 17px;
  position: static;
  border-radius: 8px;
  background: rgb(56, 58, 60);
  border: none;
  outline: none;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 16px;
  padding-left: 53px;
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}

.search__bar-input::-webkit-input-placeholder {
  color: #aaa;
}

.search__bar-input::-moz-placeholder {
  color: #aaa;
}

.search__bar-input:-ms-input-placeholder {
  color: #aaa;
}

.search__bar-input::-ms-input-placeholder {
  color: #aaa;
}

.search__bar-input::placeholder {
  color: #aaa;
}

.search__bar-icon {
  position: absolute;
  left: 17px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  pointer-events: none;
  width: 20px;
  height: 20px;
}

.search__bar-clear {
  position: absolute;
  right: 20px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.search__result {
  position: absolute;
  top: 60px;
  left: 85px;
  padding: 5px;
  margin: 0;
  max-width: 560px;
  width: 85%;
  z-index: 1;
  border-radius: 8px;
  background: rgb(57, 59, 60);
  list-style: none;
}

.search__result-items {
  padding: 20px 8px 20px 8px;
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
}

.search__result-items:hover {
  outline: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 6px;
}

.result__info {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.result__info-poster {
  width: 40px;
  height: 52px;
  padding-right: 16px;
}

.details {
  margin-bottom: 5px;
}

.details__item {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.details__item:nth-last-child(n + 2) {
  padding-right: 12px;
}

.info-detals__title {
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
}

.rating__star {
  width: 12px;
  height: 20px;
  margin-right: 2px;
}

.rating__value {
  color: rgb(255, 255, 255);
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
}

.rating__box {
  width: 47px;
  height: 20px;
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

@media (max-width: 1200px) {
  .search__result {
    max-width: 560px;
    width: 85%;
  }

  .search__result-items {
    padding: 10px 8px;
  }

  .details {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
}

@media (max-width: 1024px) {
  .search__result {
    width: 77%;
  }
}

@media (max-width: 900px) {
  .search__result {
    left: 0;
    width: 98%;
  }

  .result__info-poster {
    width: auto;
  }
}

@media (max-width: 799px) {
  .search {
    position: static;
    height: 20px;
    width: auto;
    /* margin-right: auto; */
  }

  .search__bar {
    position: static;
    width: 100%;
  }

  .search__bar-input {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 45px;
    /* position: static; */
    border-radius: 8px;
    background: rgb(56, 58, 60);
    border: none;
    outline: none;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 16px;
    padding-left: 50px;
    color: rgb(255, 255, 255);
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    -webkit-transition: opacity 0.3s ease, width 0.3s ease;
    -o-transition: opacity 0.3s ease, width 0.3s ease;
    transition: opacity 0.3s ease, width 0.3s ease;
  }

  .search__input-wrapper {
    position: absolute;
    top: 4%;
    left: 133px;
    width: 67%;
    z-index: 1000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .search__bar-clear {
    right: 30px;
  }

  .search__result {
    width: 67%;
    top: 70px;
    left: 133px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .result__info-poster {
    width: auto;
  }
}

@media (max-width: 500px) {
  .search {
    position: static;
    height: 20px;
    width: auto;
    margin-right: 20px;
  }

  .search__bar {
    position: static;
    width: 100%;
  }

  .search__bar-input {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 55px;
    position: static;
    border-radius: 8px;
    background: rgb(56, 58, 60);
    border: none;
    outline: none;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 16px;
    padding-left: 50px;
    color: rgb(255, 255, 255);
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    -webkit-transition: opacity 0.3s ease, width 0.3s ease;
    -o-transition: opacity 0.3s ease, width 0.3s ease;
    transition: opacity 0.3s ease, width 0.3s ease;
  }

  .search__input-wrapper {
    position: absolute;
    top: 3%;
    left: 19px;
    width: 90%;
    z-index: 1000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .search__bar-clear {
    right: 30px;
  }

  .search__result {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    top: 81px; /* Расстояние от верхнего края до блока с результатами */
    left: 19px;
    width: 90%;
    padding: 0;
    overflow-y: auto; /* Добавляем вертикальный скролл, если результаты не помещаются */
    border-radius: 8px;
    background: rgb(57, 59, 60);
    z-index: 1000; /* Убедимся, что блок с результатами находится поверх других элементов */
  }

  .search__result-items {
    padding: 14px 10px;
  }

  .search__result-items:hover {
    outline: none;
    /* border-radius: 6px; */
  }

  .result__info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 220px;
  }

  .result__info-poster {
    width: auto;
    height: 206px;
    padding-right: 61px;
    padding-bottom: 16px;
  }

  .details {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
}
</style>

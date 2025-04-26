<template>
  <div class="genres">
    <h1 class="genres__title" @click="goToGenres">
      <svg
        class="genres__title-svg"
        width="40.000000"
        height="40.000000"
        viewBox="0 0 40 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <clipPath id="clip1_809">
            <rect
              id="icon / chevron"
              rx="0.000000"
              width="39.000000"
              height="39.000000"
              transform="translate(0.500000 0.500000)"
              fill="white"
              fill-opacity="0"
            />
          </clipPath>
        </defs>
        <rect
          id="icon / chevron"
          rx="0.000000"
          width="39.000000"
          height="39.000000"
          transform="translate(0.500000 0.500000)"
          fill="#FFFFFF"
          fill-opacity="0"
        />
        <g clip-path="url(#clip1_809)">
          <path
            id="Vector"
            d="M18.04 20L26.29 28.25L23.93 30.6L13.33 20L23.93 9.39L26.29 11.75L18.04 20Z"
            fill="#FFFFFF"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </g>
      </svg>
      {{ genreTranslations[genre] }}
    </h1>
    <div class="genres__list">
      <MovieCard
        v-for="movie in displayedMovies"
        :key="movie.id"
        :movie="movie"
        class="genres__item"
      />
    </div>
    <!-- Кнопка "Показать ещё" теперь работает и на мобильных устройствах -->
    <button class="genres__load-more" @click="loadMore">Показать ещё</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";

export default defineComponent({
  components: {
    MovieCard,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const genre = ref<string>(route.params.genre as string);
    const movies = ref<any[]>([]);
    const page = ref<number>(1);
    const limit = ref<number>(15);
    const offset = ref<number>(0);
    const isMobile = ref<boolean>(window.innerWidth < 501);

    const genreTranslations: Record<string, string> = {
      history: "Исторический",
      drama: "Драма",
      family: "Семейный",
      thriller: "Триллер",
      fantasy: "Фантастика",
      adventure: "Приключение",
      crime: "Детектив",
      comedy: "Комедия",
    };

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://cinemaguide.skillbox.cc/movie?genre=${genre.value}&page=${page.value}`
        );
        movies.value = [...movies.value, ...response.data];
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    // Определяем количество отображаемых карточек в зависимости от ширины экрана
    const displayedMovies = computed(() => {
      return movies.value.slice(0, offset.value);
    });

    const loadMore = () => {
      if (isMobile.value) {
        offset.value += 5; // На мобильных устройствах добавляем по 5 карточек
      } else {
        offset.value += limit.value; // На десктопах добавляем по 15 карточек
      }

      // Если достигнут конец списка, загружаем следующую страницу
      if (offset.value >= movies.value.length) {
        page.value++;
        fetchMovies();
      }
    };

    const goToGenres = () => {
      router.push({ name: "genres" });
    };

    // Обработчик изменения размера окна
    const handleResize = () => {
      isMobile.value = window.innerWidth < 500;
    };

    // Добавляем обработчик изменения размера окна при монтировании компонента
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      fetchMovies().then(() => {
        offset.value = isMobile.value ? 5 : limit.value; // На мобильных устройствах сразу показываем 5 карточек
      });
    });

    // Убираем обработчик при размонтировании компонента
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      genre,
      movies,
      loadMore,
      genreTranslations,
      goToGenres,
      displayedMovies,
    };
  },
});
</script>

<style scoped>
.genres {
  margin-top: 63px;
  margin-bottom: 164px;
}

.genres__title {
  margin-bottom: 65px;
  text-align: left;
  color: rgb(255, 255, 255);
  font-size: 48px;
  font-weight: 700;
  cursor: pointer;
}

.genres__list {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 40px 1fr 40px 1fr 40px 1fr 40px 1fr;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  grid-row-gap: 60px;
}

.genres__item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 24px;
  -webkit-box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
  box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
  background: rgb(10, 10, 11);
  cursor: pointer;
}

.genres__load-more {
  margin-top: 66px;
  width: 206px;
  height: 54px;
  border-radius: 28px;
  border: none;
  background: rgb(103, 165, 235);
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.genres__load-more:hover {
  background: rgb(69, 82, 110);
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 1200px) {
  .genres__title {
    margin-bottom: 50px;
    font-size: 35px;
  }

  .genres__title-svg {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 900px) {
  .genres__title {
    margin-bottom: 40px;
    font-size: 30px;
  }

  .genres__title-svg {
    width: 30px;
    height: 25px;
  }

  .genres__list {
    -ms-grid-columns: 1fr 20px 1fr 20px 1fr;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    grid-row-gap: 30px;
  }
}
@media (max-width: 500px) {
  .genres {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-top: 16px;
    margin-bottom: 40px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .genres__title {
    width: 100%;
    margin-bottom: 40px;
    font-size: 24px;
  }

  .genres__title-svg {
    width: 35px;
    height: 35px;
    margin-bottom: -5px;
  }

  .genres__list {
    -ms-grid-columns: 335px;
    grid-template-columns: 335px;
    gap: 24px;
    display: -ms-grid;
    display: grid;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .genres__load-more {
    margin-top: 40px;
    max-width: 335px;
    width: 100%;
  }
}
</style>

<template>
  <div class="genres">
    <h1 class="genres__title">Жанры фильмов</h1>
    <div class="genres__list">
      <div
        v-for="genre in filteredGenres"
        :key="genre.english"
        class="genres__item"
        @click="goToGenre(genre.english)"
      >
        <img :src="genre.image" :alt="genre.russian" class="genres__image" />
        <span class="genres__name">{{ genre.russian }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const filteredGenres = ref<any[]>([]); // Фильтрованные жанры
    const router = useRouter();

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

    const genreImages: Record<string, string> = {
      history: new URL("../assets/genres/history.png", import.meta.url).href,
      drama: new URL("../assets/genres/drama.png", import.meta.url).href,
      family: new URL("../assets/genres/family.png", import.meta.url).href,
      thriller: new URL("../assets/genres/thriller.png", import.meta.url).href,
      fantasy: new URL("../assets/genres/fantasy.png", import.meta.url).href,
      adventure: new URL("../assets/genres/adventure.png", import.meta.url)
        .href,
      crime: new URL("../assets/genres/detective.png", import.meta.url).href,
      comedy: new URL("../assets/genres/comedy.png", import.meta.url).href,
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://cinemaguide.skillbox.cc/movie/genres"
        );
        const allGenres = response.data;

        // Фильтруем и отображаем только нужные жанры
        filteredGenres.value = allGenres
          .filter((genre: string) => genreTranslations[genre])
          .map((genre: string) => ({
            english: genre,
            russian: genreTranslations[genre],
            image: genreImages[genre],
          }));
      } catch (error) {
        console.error("Failed to fetch genres", error);
      }
    };

    const goToGenre = (genre: string) => {
      router.push({ name: "genreMovies", params: { genre } });
    };

    fetchGenres();

    return {
      filteredGenres,
      goToGenre,
    };
  },
});
</script>

<style scoped>
.genres {
  margin-top: 66px;
  margin-bottom: 164px;
}

.genres__title {
  margin-bottom: 65px;
  text-align: left;
  color: rgb(255, 255, 255);
  font-size: 46px;
  font-weight: 700;
}

.genres__list {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 40px 1fr 40px 1fr 40px 1fr;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  grid-row-gap: 60px;
}

.genres__item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  max-width: 290px;
  max-height: 304px;
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

.genres__image {
  width: 290px;
  height: 220px;
  border-radius: 24px 24px 0px 0px;
  -o-object-fit: cover;
  object-fit: cover;
}

.genres__name {
  margin: 22px 0 30px 0;
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
}

@media (max-width: 1200px) {
  .genres {
    margin-top: 50px;
    margin-bottom: 85px;
  }

  .genres__title {
    margin-bottom: 30px;
    color: rgb(255, 255, 255);
    font-size: 35px;
  }

  .genres__name {
    margin: 12px 0 20px 0;
    font-size: 18px;
  }
}

@media (max-width: 900px) {
  .genres__title {
    font-size: 30px;
  }
}

@media (max-width: 799px) {
  .genres__list {
    justify-items: center;
    -ms-grid-columns: 1fr 10px 1fr;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    grid-row-gap: 30px;
  }
}

@media (max-width: 500px) {
  .genres {
    margin-top: 16px;
    margin-bottom: 40px;
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

  .genres__title {
    width: 100%;
    margin-bottom: 40px;
    font-size: 24px;
  }

  .genres__list {
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr; /* Одна колонна */
    gap: 24px;
  }
}
</style>

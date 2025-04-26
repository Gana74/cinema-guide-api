<template>
  <div
    class="card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="goToMovieDetails"
  >
    <div class="card__container">
      <!-- Отображаем нумерацию только если index передан -->
      <div v-if="index !== undefined" class="card__number">{{ index + 1 }}</div>
      <img
        v-if="movie.posterUrl"
        :src="movie.posterUrl"
        :alt="movie.title"
        class="card__poster"
      />
      <div v-else class="card__poster-no">No Poster Available</div>

      <!-- Крестик для удаления фильма из избранного -->
      <div
        v-if="isHovered && showDelete"
        class="card__delete"
        @click.stop="removeFromFavorites"
      >
        <svg
          class="card__delete-svg"
          width="12.727959"
          height="12.727905"
          viewBox="0 0 12.728 12.7279"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs />
          <path
            id="Vector"
            d="M6.36 4.94L11.31 0L12.72 1.41L7.77 6.36L12.72 11.31L11.31 12.72L6.36 7.77L1.41 12.72L0 11.31L4.94 6.36L0 1.41L1.41 0L6.36 4.94Z"
            fill="#000000"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { useRouter } from "vue-router";
import { useFavoritesStore } from "../stores/favorites";

export default defineComponent({
  props: {
    movie: {
      type: Object as PropType<any>,
      required: true,
    },
    index: {
      type: Number,
      required: false, // Указываем, что index необязательный
    },
    showDelete: {
      type: Boolean,
      default: false, // По умолчанию крестик не отображается
    },
  },
  setup(props) {
    const router = useRouter();
    const favoritesStore = useFavoritesStore();
    const isHovered = ref(false); // Состояние для отслеживания наведения мыши

    const goToMovieDetails = () => {
      router.push({ name: "movieDetails", params: { id: props.movie.id } });
    };

    const removeFromFavorites = () => {
      favoritesStore.removeFavorite(props.movie.id);
    };

    return {
      goToMovieDetails,
      removeFromFavorites,
      isHovered,
    };
  },
});
</script>

<style scoped>
.card {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: calc((100% - 160px) / 5);
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
  box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
  border-radius: 15px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  -webkit-transition: -webkit-transform 0.3s ease;
  transition: -webkit-transform 0.3s ease;
  -o-transition: transform 0.3s ease;
  transition: transform 0.3s ease;
  transition: transform 0.3s ease, -webkit-transform 0.3s ease;
}

.card:hover {
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
}

.card__container {
  position: relative;
  width: 100%;
}

.card__number {
  position: absolute;
  top: -10px;
  left: -15px;
  padding: 8px 24px;
  border-radius: 50px;
  background: rgb(255, 255, 255);
  color: rgb(106, 93, 193);
  font-size: 24px;
  font-weight: 700;
}

.card__poster {
  width: 100%; /* Растягиваем постер на всю ширину контейнера */
  height: auto; /* Автоматическая высота для сохранения пропорций */
  border-radius: 15px;
  aspect-ratio: 2 / 3; /* Сохраняем пропорции 2:3 (ширина к высоте) */
}

.card__poster-no {
  width: 100%; /* Растягиваем на всю ширину контейнера */
  height: auto; /* Автоматическая высота */
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
  border-radius: 15px;
  aspect-ratio: 2 / 3; /* Сохраняем пропорции 2:3 */
}

.card__delete {
  position: absolute;
  width: 40px;
  height: 40px;
  top: -15px;
  right: -15px;
  cursor: pointer;
  border-radius: 30px;
  opacity: 0;
  background: rgb(255, 255, 255);
  -webkit-transition: opacity 0.3s ease;
  -o-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}

.card__delete-svg {
  padding: 13px;
}

.card:hover .card__delete {
  opacity: 1;
}

@media (max-width: 900px) {
  .card__number {
    padding: 4px 15px;
    font-size: 18px;
  }
}

@media (max-width: 799px) {
  .card {
    width: calc((100% - 160px) / 2);
  }
}

@media (max-width: 500px) {
  .card {
    width: 223px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.33);
    box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.33);
  }

  .card__poster,
  .card__poster-no {
    aspect-ratio: 2 / 3;
  }
}
</style>

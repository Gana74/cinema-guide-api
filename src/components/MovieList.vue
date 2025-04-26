<template>
  <div class="top-list">
    <div class="top-list__card">
      <MovieCard
        v-for="(movie, index) in movies"
        :key="movie.id"
        :movie="movie"
        :index="showIndex ? index : undefined"
        :showDelete="showDelete"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import MovieCard from "./MovieCard.vue";

export default defineComponent({
  components: { MovieCard },
  props: {
    movies: {
      type: Array as PropType<any[]>,
      required: true,
    },
    showIndex: {
      type: Boolean,
      default: false,
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style scoped>
.top-list__card {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-top: 60px;
  margin-bottom: 120px;
  gap: 64px 40px;
}

@media (max-width: 799px) {
  .top-list__card {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
}

@media (max-width: 500px) {
  .top-list__card {
    margin-top: 40px;
    margin-bottom: 32px;
    padding: 26px 0 23px 23px;
    gap: 30px; /* Уменьшаем отступы для мобильных устройств */
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap; /* Отключаем перенос строк */
    overflow-x: auto; /* Включаем горизонтальную прокрутку */
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start; /* Карточки выравниваем по началу */
  }

  .top-list {
    overflow-x: auto;
  }
}
</style>

<template>
  <div>
    <div
      v-for="genre in genres"
      :key="genre.name"
      @click="goToGenre(genre.name)"
    >
      <h2>{{ genre.name }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    genres: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const goToGenre = (genre: string) => {
      router.push(`/genres/${genre}`);
    };
    return { goToGenre };
  },
});
</script>

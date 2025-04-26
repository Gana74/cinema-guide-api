<template>
  <div class="modal">
    <div class="modal__content" @click.stop>
      <div class="modal__exit" @click="$emit('close')">
        <svg
          class="modal__exit-svg"
          width="18.414062"
          height="18.414307"
          viewBox="0 0 18.4141 18.4143"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs />
          <path
            id="Vector"
            d="M7.79 9.2L0 1.41L1.41 0L9.2 7.79L17 0L18.41 1.41L10.62 9.2L18.41 17L17 18.41L9.2 10.62L1.41 18.41L0 17L7.79 9.2Z"
            fill="#000000"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["close"],
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Фон затемнения */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: 1000;
}

.modal__content {
  position: relative;
}

.modal__exit {
  position: absolute;
  width: 48px;
  height: 48px;
  right: -72px;
  cursor: pointer;
  z-index: 10;
  border-radius: 30px;
  background: rgb(255, 255, 255);
  -webkit-transition: opacity 0.3s ease;
  -o-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}

.modal__exit-svg {
  padding: 15px;
}

@media (max-width: 500px) {
  .modal__exit {
    right: 15px;
    top: 10px;
  }
}
</style>

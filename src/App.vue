<template>
  <div class="app">
    <header class="header">
      <nav class="nav">
        <router-link class="nav__logo flex" to="/">
          <div class="logo">
            <div class="logo__background"></div>
            <div class="logo__hover"></div>
          </div>
        </router-link>
        <router-link
          class="nav__item nav__item-main"
          :class="{ active: $route.path === '/' }"
          to="/"
        >
          <p class="nav__item-text">Главная</p>
        </router-link>
        <router-link
          class="nav__item nav__item-genres"
          :class="{ active: isGenrePage }"
          to="/genres"
        >
          <p class="nav__item-text">Жанры</p>
        </router-link>

        <SearchBar class="nav__search" />

        <div class="nav__user" v-if="isAuthenticated">
          <button
            @click="goToAccount"
            class="nav__user-name"
            :class="{ active: $route.path === '/account' }"
          >
            {{ userName }}
          </button>
          <button @click="goToAccount" class="nav__enter"></button>
        </div>
        <button class="nav__enter" v-else @click="showAuthModal">
          <span class="nav__enter-text">Войти</span>
        </button>
      </nav>
    </header>

    <main class="main">
      <router-view />
    </main>

    <Modal v-if="authModalVisible" @close="hideAuthModal">
      <AuthForm
        @loginSuccess="hideAuthModal"
        @registerSuccess="hideAuthModal"
        @showSuccessModal="showSuccessRegistrationModal"
      />
    </Modal>

    <Modal v-if="successModalVisible" @close="hideSuccessModal">
      <div class="success-modal">
        <div class="success-modal__logo"></div>
        <h2 class="success-modal__title">Регистрация завершена</h2>
        <p class="success-modal__text">Теперь вы можете войти в свой аккаунт</p>
        <button class="success-modal__button" @click="handleSuccessModalLogin">
          Войти
        </button>
      </div>
    </Modal>

    <footer class="footer flex">
      <div class="footer__contact flex">
        <a
          href="https://vk.com/aham74"
          class="footer__contact-link footer__contact-vk"
          aria-label="Ссылка на страницу ВКонтакте"
        ></a>
        <a
          href="https://rutube.ru/channel/13155965/"
          class="footer__contact-link footer__contact-rt"
          aria-label="Ссылка на Rutube"
        ></a>
        <a
          href="https://vk.com/aham74"
          class="footer__contact-link footer__contact-ok"
          aria-label="Ссылка на страницу Одноклассников"
        ></a>
        <a
          href="https://vk.com/aham74"
          class="footer__contact-link footer__contact-tg"
          aria-label="Ссылка на страницу Telegram"
        ></a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, provide } from "vue";
import { useAuthStore } from "./stores/auth";
import { useRouter, useRoute } from "vue-router";
import Modal from "./components/Modal.vue";
import AuthForm from "./components/AuthForm.vue";
import SearchBar from "./components/SearchBar.vue";

export default defineComponent({
  components: {
    Modal,
    AuthForm,
    SearchBar,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const authModalVisible = ref(false);
    const successModalVisible = ref(false);

    const showAuthModal = () => {
      authModalVisible.value = true;
    };

    const hideAuthModal = () => {
      authModalVisible.value = false;
    };

    const showSuccessRegistrationModal = () => {
      authModalVisible.value = false;
      successModalVisible.value = true;
    };

    const hideSuccessModal = () => {
      successModalVisible.value = false;
    };

    const handleSuccessModalLogin = () => {
      hideSuccessModal();
      authModalVisible.value = true;
    };

    const userName = computed(() => authStore.user?.name || "User");
    const isAuthenticated = computed(() => authStore.isAuthenticated);

    const goToAccount = () => {
      router.push("/account");
    };

    const handleLogin = async (email: string, password: string) => {
      try {
        await authStore.login(email, password);
        hideAuthModal();
      } catch (error) {
        console.error("Login failed", error);
      }
    };

    const handleRegister = async (
      email: string,
      password: string,
      name: string,
      surname: string
    ) => {
      try {
        await authStore.register(email, password, name, surname);
        hideAuthModal();
      } catch (error) {
        console.error("Registration failed", error);
      }
    };

    const logout = async () => {
      try {
        await authStore.logout();
        router.push("/");
      } catch (error) {
        console.error("Logout failed", error);
      }
    };

    const isGenrePage = computed(() => {
      return route.path.startsWith("/genres");
    });

    provide("showAuthModal", showAuthModal);

    return {
      isAuthenticated,
      userName,
      authModalVisible,
      successModalVisible,
      showAuthModal,
      hideAuthModal,
      showSuccessRegistrationModal,
      hideSuccessModal,
      handleSuccessModalLogin,
      handleLogin,
      handleRegister,
      logout,
      goToAccount,
      isGenrePage,
    };
  },
});
</script>

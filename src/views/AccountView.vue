<template>
  <div class="account">
    <h2 class="account__title">Мой аккаунт</h2>
    <div class="account__tabs">
      <button
        class="account__tabs-favorites button-favorites"
        @click="setTab('favorites')"
        :class="{ active: currentTab === 'favorites' }"
      >
        <svg
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
            d="M14.5 0C17.53 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.93 15.6C11.81 15.04 12.61 14.49 13.35 13.9C16.33 11.53 18 8.94 18 6C18 3.64 16.46 2 14.5 2C13.42 2 12.25 2.56 11.41 3.41L10 4.82L8.58 3.41C7.74 2.56 6.57 2 5.5 2C3.55 2 2 3.65 2 6C2 8.94 3.66 11.53 6.64 13.9C7.39 14.49 8.18 15.04 9.06 15.6C9.36 15.79 9.66 15.97 10 16.17C10.33 15.97 10.63 15.79 10.93 15.6Z"
            fill="#FFFFFF"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
        &nbsp;<span class="button-favorites__desctop">Избранные фильмы</span
        ><span class="button-favorites__mobile">Избранное</span>
      </button>
      <button
        class="account__tabs-settings button-accaunt"
        @click="setTab('settings')"
        :class="{ active: currentTab === 'settings' }"
      >
        <svg
          width="16.000000"
          height="21.000000"
          viewBox="0 0 16 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs />
          <path
            id="Vector"
            d="M0 21C0 16.58 3.58 13 8 13C12.41 13 16 16.58 16 21L14 21C14 17.68 11.31 15 8 15C4.68 15 2 17.68 2 21L0 21ZM8 12C4.68 12 2 9.31 2 6C2 2.68 4.68 0 8 0C11.31 0 14 2.68 14 6C14 9.31 11.31 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.78 10.21 2 8 2C5.79 2 4 3.78 4 6C4 8.21 5.79 10 8 10Z"
            fill="#FFFFFF"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
        &nbsp;<span class="button-accaunt__desctop">Настройки аккаунта</span
        ><span class="button-accaunt__mobile">Настройки</span>
      </button>
    </div>

    <div v-if="currentTab === 'favorites'">
      <div v-if="favorites.length > 0">
        <MovieList :movies="favorites" :showIndex="false" :showDelete="true" />
      </div>
    </div>

    <div class="account__setting" v-if="currentTab === 'settings'">
      <div class="user flex">
        <div class="user__avatar flex">
          {{ getInitials(user.name, user.surname) }}
        </div>
        <div class="user__personality flex">
          <p class="user__performance">Имя Фамилия</p>
          <p class="user__name">{{ user.name }} {{ user.surname }}</p>
        </div>
      </div>
      <div class="email flex">
        <div class="email__avatar flex">
          <svg
            width="22.000000"
            height="18.000000"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs />
            <path
              id="Vector"
              d="M21 0C21.55 0 22 0.44 22 1L22 17C22 17.55 21.54 18 21 18L2.99 18C2.44 18 2 17.55 2 17L2 16L20 16L20 4.29L12 11.5L2 2.5L2 1C2 0.44 2.44 0 3 0L21 0ZM8 12L8 14L0 14L0 12L8 12ZM5 7L5 9L0 9L0 7L5 7ZM19.56 2L4.43 2L12 8.8L19.56 2Z"
              fill="#FFFFFF"
              fill-opacity="1.000000"
              fill-rule="nonzero"
            />
          </svg>
        </div>
        <div class="email__personality flex">
          <p class="email__performance">Электронная почта</p>
          <p class="email__name">{{ user.email }}</p>
        </div>
      </div>
      <button class="account__setting-bt" @click="logout">
        Выйти из аккаунта
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useAuthStore } from "../stores/auth";
import { useFavoritesStore } from "../stores/favorites";
import MovieList from "../components/MovieList.vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  components: { MovieList },
  setup() {
    const authStore = useAuthStore();
    const favoritesStore = useFavoritesStore();
    const router = useRouter();
    const route = useRoute();

    const user = ref(authStore.user);
    const favorites = ref<any[]>([]);
    const currentTab = ref("favorites"); // По умолчанию "Избранные фильмы"

    // Устанавливаем начальное состояние вкладки в зависимости от маршрута
    onMounted(() => {
      if (route.path.includes("settings")) {
        currentTab.value = "settings";
      } else {
        currentTab.value = "favorites";
      }
    });

    // Функция для переключения вкладок
    const setTab = (tab: string) => {
      currentTab.value = tab;
      // Обновляем маршрут в зависимости от выбранной вкладки
      if (tab === "favorites") {
        router.push("/account/favorites");
      } else if (tab === "settings") {
        router.push("/account/settings");
      }
    };

    onMounted(async () => {
      await authStore.fetchUser();
      await favoritesStore.fetchFavorites();
      favorites.value = favoritesStore.favorites; // Инициализация списка избранных фильмов
      user.value = authStore.user;
    });

    // Подписываемся на изменения списка избранных фильмов
    watch(
      () => favoritesStore.favorites,
      (newFavorites) => {
        favorites.value = newFavorites; // Обновляем локальный список
      }
    );

    const logout = async () => {
      try {
        await authStore.logout();
        router.push("/");
      } catch (error) {
        console.error("Logout failed", error);
      }
    };

    // Функция для получения инициалов
    const getInitials = (firstName: string, lastName: string) => {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    };

    return {
      user,
      favorites,
      currentTab,
      setTab,
      logout,
      getInitials,
    };
  },
});
</script>

<style scoped>
.account {
  margin-top: 65px;
  margin-bottom: 406px;
  text-align: left;
}

.account__title {
  margin-bottom: 75px;
  color: rgb(255, 255, 255);
  font-size: 48px;
  font-weight: 700;
}

.account__tabs {
  margin-bottom: 76px;
}

.account__tabs-favorites,
.account__tabs-settings {
  position: relative;
  margin-right: 60px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: 400;
}

.account__tabs-favorites::after,
.account__tabs-settings::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 1.5px;
  background-color: transparent;
  -webkit-transition: background-color 0.3s ease;
  -o-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
}

.account__tabs-favorites:hover::after,
.account__tabs-settings:hover::after,
.account__tabs-favorites:focus::after,
.account__tabs-settings:focus::after,
.account__tabs-favorites.active::after,
.account__tabs-settings.active::after {
  background-color: rgb(220, 93, 252);
}

.button-accaunt__desctop,
.button-favorites__desctop {
  display: inline;
}

.button-accaunt__mobile,
.button-favorites__mobile {
  display: none;
}

.user {
  margin-bottom: 40px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.user__avatar {
  width: 60px;
  height: 60px;
  margin-right: 16px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.5);
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: 700;
}

.user__personality,
.email__personality {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.user__performance,
.email__performance {
  padding-bottom: 5px;
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-weight: 400;
}

.user__name,
.email__name {
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: 700;
}

.email {
  margin-bottom: 62px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.email__avatar {
  width: 60px;
  height: 60px;
  margin-right: 16px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.5);
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.account__setting-bt {
  width: 248px;
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

.account__setting-bt:hover {
  background: rgb(69, 82, 110);
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 1200px) {
  .account {
    margin-top: 50px;
    margin-bottom: 200px;
  }
  .account__title {
    margin-bottom: 60px;
    font-size: 40px;
  }
}

@media (max-width: 900px) {
  .account {
    margin-top: 50px;
    margin-bottom: 200px;
  }
  .account__title {
    margin-bottom: 45px;
    font-size: 35px;
  }

  .account__tabs {
    margin-bottom: 50px;
  }

  .account__tabs-favorites {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .account__tabs-settings {
    font-size: 20px;
    margin-right: 0;
  }
}

@media (max-width: 500px) {
  .account {
    margin-bottom: 100px;
  }

  .account__title {
    margin-bottom: 40px;
    font-size: 24px;
  }

  .account__tabs {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 40px;
  }

  .account__tabs-favorites {
    margin-right: auto;
  }

  .button-accaunt__desctop,
  .button-favorites__desctop {
    display: none;
  }

  .button-accaunt__mobile,
  .button-favorites__mobile {
    display: inline;
  }

  .user__performance,
  .email__performance {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }

  .user__name,
  .email__name {
    font-size: 18px;
  }

  .user__avatar,
  .email__avatar {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }

  .account__setting-bt {
    width: 330px;
    margin: 0;
    margin-bottom: 130px;
  }
}
</style>

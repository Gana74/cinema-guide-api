import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GenresView from "../views/GenresView.vue";
import GenreMoviesView from "../views/GenreMoviesView.vue";
import MovieDetails from "../views/MovieDetails.vue";
import AccountView from "../views/AccountView.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  {
    path: "/genres",
    name: "genres",
    component: GenresView,
  },
  {
    path: "/genres/:genre",
    name: "genreMovies",
    component: GenreMoviesView,
  },
  {
    path: "/movie/:id",
    name: "movieDetails",
    component: MovieDetails,
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
    meta: { requiresAuth: true }, // Добавляем метаданные для проверки авторизации
    children: [
      { path: "favorites", component: AccountView },
      { path: "settings", component: AccountView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  // Проверяем и обновляем состояние isAuthenticated из localStorage
  authStore.isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login"); // Перенаправляем на страницу входа
  } else {
    next();
  }
});

export default router;

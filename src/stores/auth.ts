import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    user: (() => {
      const user = localStorage.getItem("user");
      try {
        return user ? JSON.parse(user) : { name: "User", email: "" };
      } catch (e) {
        console.error("Error parsing user data", e);
        return { name: "User", email: "" };
      }
    })(),
    token: localStorage.getItem("token") || "",
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        // Запрос на логин
        const response = await axios.post(
          "https://cinemaguide.skillbox.cc/auth/login",
          { email, password },
          { withCredentials: true }
        );

        // Если логин успешен, запрашиваем профиль
        if (response.status === 200 && response.data.result === true) {
          const profileResponse = await axios.get(
            "https://cinemaguide.skillbox.cc/profile",
            { withCredentials: true }
          );

          // Проверка наличия данных профиля
          if (profileResponse.data) {
            this.isAuthenticated = true;
            this.user = profileResponse.data;
            this.token = "someTokenValue";

            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", JSON.stringify(this.user));
            localStorage.setItem("token", this.token);
          } else {
            console.warn("User data not found in response");
          }
        } else {
          throw new Error("Invalid login response");
        }
      } catch (error) {
        console.error("Login failed", error);
        throw new Error("Login failed");
      }
    },

    async register(
      email: string,
      password: string,
      name: string,
      surname: string
    ) {
      try {
        const response = await axios.post(
          "https://cinemaguide.skillbox.cc/user",
          { email, password, name, surname },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data) {
          // Автоматический вход после успешной регистрации
          // await this.login(email, password);
        } else {
          throw new Error("Invalid registration response");
        }
      } catch (error) {
        console.error("Registration failed", error);
        throw new Error("Registration failed");
      }
    },

    async fetchUser() {
      try {
        const response = await axios.get(
          "https://cinemaguide.skillbox.cc/profile",
          { withCredentials: true }
        );

        if (response.data) {
          this.user = response.data;
          localStorage.setItem("user", JSON.stringify(this.user));
        } else {
          console.error("User data not found in response", response);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    },

    async logout() {
      try {
        await axios.get("https://cinemaguide.skillbox.cc/auth/logout", {
          withCredentials: true,
        });
        this.isAuthenticated = false;
        this.user = { name: "User", email: "" };
        this.token = "";
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } catch (error) {
        console.error("Logout failed", error);
        throw new Error("Logout failed");
      }
    },

    checkAuth() {
      return this.isAuthenticated;
    },
  },
});

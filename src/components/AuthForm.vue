<template>
  <div class="auth-form" :class="{ 'auth-form__register': !isLoginForm }">
    <div v-if="isLoginForm" class="auth-form__section">
      <div class="auth-form__logo"></div>
      <form @submit.prevent="handleLogin" class="auth-form__form">
        <input
          v-model="loginEmail"
          type="email"
          name="email"
          placeholder="Электронная почта"
          required
          class="auth-form__input auth-form__input-email"
          :class="{ 'auth-form__input--error': emailError }"
        />
        <input
          v-model="loginPassword"
          type="password"
          placeholder="Пароль"
          required
          class="auth-form__input auth-form__input-password"
          :class="{ 'auth-form__input--error': emailError }"
        />
        <button type="submit" class="auth-form__button">Войти</button>
      </form>

      <button @click="toggleForm" class="auth-form__button-register">
        Регистрация
      </button>
    </div>
    <div v-else class="auth-form__section">
      <div class="auth-form__logo"></div>
      <h2 class="auth-form__title">Регистрация</h2>
      <form @submit.prevent="handleRegister" class="auth-form__form">
        <input
          v-model="registerEmail"
          type="email"
          name="email"
          placeholder="Электронная почта"
          :class="{ 'auth-form__input--error': emailError }"
          @blur="validateEmail"
          required
          class="auth-form__input auth-form__input-email"
        />
        <input
          v-model="registerName"
          type="text"
          placeholder="Name"
          :class="{ 'auth-form__input--error': nameError }"
          @blur="validateName"
          required
          class="auth-form__input auth-form__input-name"
        />
        <input
          v-model="registerSurname"
          type="text"
          placeholder="Surname"
          :class="{ 'auth-form__input--error': surnameError }"
          @blur="validateSurname"
          required
          class="auth-form__input auth-form__input-surname"
        />
        <input
          v-model="registerPassword"
          type="password"
          placeholder="Пароль"
          :class="{ 'auth-form__input--error': passwordError }"
          @blur="validatePassword"
          required
          class="auth-form__input auth-form__input-password"
        />
        <input
          v-model="registerConfirmPassword"
          type="password"
          placeholder="Подтверждение пароля"
          :class="{ 'auth-form__input--error': confirmPasswordError }"
          @blur="validateConfirmPassword"
          required
          class="auth-form__input auth-form__input-password"
        />
        <button type="submit" class="auth-form__button">Создать аккаунт</button>
      </form>
      <button @click="toggleForm" class="auth-form__toggle-button">
        У меня есть пароль
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

interface AuthFormMethods {
  toggleForm: () => void;
  handleLogin: () => Promise<void>;
  handleRegister: () => Promise<void>;
  validateEmail: () => void;
  validateName: () => void;
  validateSurname: () => void;
  validatePassword: () => void;
  validateConfirmPassword: () => void;
}

export default defineComponent({
  emits: ["loginSuccess", "registerSuccess", "showSuccessModal"],
  setup(_props, { emit }) {
    const router = useRouter();
    const authStore = useAuthStore();
    const isLoginForm = ref(true);
    const loginEmail = ref("");
    const loginPassword = ref("");
    const registerEmail = ref("");
    const registerName = ref("");
    const registerSurname = ref("");
    const registerPassword = ref("");
    const registerConfirmPassword = ref("");

    // Validation error states
    const emailError = ref(false);
    const nameError = ref(false);
    const surnameError = ref(false);
    const passwordError = ref(false);
    const confirmPasswordError = ref(false);

    const toggleForm = () => {
      isLoginForm.value = !isLoginForm.value;
    };

    const validateEmail = () => {
      emailError.value = !registerEmail.value.includes("@");
    };

    const validateName = () => {
      nameError.value = registerName.value.trim() === "";
    };

    const validateSurname = () => {
      surnameError.value = registerSurname.value.trim() === "";
    };

    const validatePassword = () => {
      passwordError.value = registerPassword.value.length < 6; // Минимум 6 символов
    };

    const validateConfirmPassword = () => {
      confirmPasswordError.value =
        registerPassword.value !== registerConfirmPassword.value;
    };

    const handleLogin = async () => {
      try {
        await authStore.login(loginEmail.value, loginPassword.value);
        emit("loginSuccess");
        router.push("/account");
      } catch (error) {
        console.error("Login failed", error);
      }
    };

    const handleRegister = async () => {
      validateEmail();
      validateName();
      validateSurname();
      validatePassword();
      validateConfirmPassword();

      if (
        !emailError.value &&
        !nameError.value &&
        !surnameError.value &&
        !passwordError.value &&
        !confirmPasswordError.value
      ) {
        try {
          await authStore.register(
            registerEmail.value,
            registerPassword.value,
            registerName.value,
            registerSurname.value
          );
          emit("registerSuccess");
          emit("showSuccessModal");
        } catch (error) {
          console.error("Registration failed", error);
        }
      }
    };

    const methods: AuthFormMethods = {
      toggleForm,
      handleLogin,
      handleRegister,
      validateEmail,
      validateName,
      validateSurname,
      validatePassword,
      validateConfirmPassword,
    };

    return {
      isLoginForm,
      loginEmail,
      loginPassword,
      registerEmail,
      registerName,
      registerSurname,
      registerPassword,
      registerConfirmPassword,
      emailError,
      nameError,
      surnameError,
      passwordError,
      confirmPasswordError,
      ...methods,
    };
  },
});
</script>

<style scoped>
/*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v8.4.14,
* Autoprefixer: v10.4.7
* Browsers: last 4 version
*/

.auth-form {
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
  width: 339px;
  height: 325px;
  margin: 0 auto;
  padding: 64px 40px;
  border-radius: 24px;
  background: rgb(255, 255, 255);
}

.auth-form__register {
  height: auto;
  padding: 54px 40px;
}

.auth-form__section {
  width: 100%;
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

.auth-form__logo {
  margin-bottom: 40px;
  width: 160px;
  height: 35px;
  background-image: url(../assets/icon/modalLogo.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.auth-form__title {
  margin-bottom: 24px;
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: 700;
}

.auth-form__form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
}

.auth-form__input-email {
  padding: 16px 16px 16px 52px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-image: url("data:image/svg+xml;utf8,<svg width='22' height='18' viewBox='0 0 22 18' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M21 0C21.55 0 22 0.44 22 1L22 17C22 17.55 21.54 18 21 18L2.99 18C2.44 18 2 17.55 2 17L2 16L20 16L20 4.29L12 11.5L2 2.5L2 1C2 0.44 2.44 0 3 0L21 0ZM8 12L8 14L0 14L0 12L8 12ZM5 7L5 9L0 9L0 7L5 7ZM19.56 2L4.43 2L12 8.8L19.56 2Z' fill='black' fill-opacity='0.4'/></svg>");
}

.auth-form__input-password {
  padding: 16px 16px 16px 52px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.91 13C12.44 15.83 9.97 18 7 18C3.68 18 1 15.31 1 12C1 8.68 3.68 6 7 6C9.97 6 12.44 8.16 12.91 11L23 11L23 13L21 13L21 17L19 17L19 13L17 13L17 17L15 17L15 13L12.91 13ZM7 16C9.2 16 11 14.2 11 12C11 9.79 9.2 8 7 8C4.79 8 3 9.79 3 12C3 14.2 4.79 16 7 16Z" fill="%23000000" fill-opacity="0.4"/></svg>');
}

.auth-form__input-name,
.auth-form__input-surname {
  padding: 16px 16px 16px 52px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-image: url('data:image/svg+xml;utf8,<svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 21C0 16.58 3.58 13 8 13C12.41 13 16 16.58 16 21L14 21C14 17.68 11.31 15 8 15C4.68 15 2 17.68 2 21L0 21ZM8 12C4.68 12 2 9.31 2 6C2 2.68 4.68 0 8 0C11.31 0 14 2.68 14 6C14 9.31 11.31 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.78 10.21 2 8 2C5.78 2 4 3.78 4 6C4 8.21 5.78 10 8 10Z" fill="%23000000" fill-opacity="0.4"/></svg>');
}

.auth-form__input {
  width: 100%;
  height: 56px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-repeat: no-repeat;
  background-position: 10px center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 18px;
  font-weight: 400;
}

.auth-form__input--error {
  border: 1px solid red;
}

.auth-form__input--error.auth-form__input-email {
  background-image: url("data:image/svg+xml;utf8,<svg width='22' height='18' viewBox='0 0 22 18' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M21 0C21.55 0 22 0.44 22 1L22 17C22 17.55 21.54 18 21 18L2.99 18C2.44 18 2 17.55 2 17L2 16L20 16L20 4.29L12 11.5L2 2.5L2 1C2 0.44 2.44 0 3 0L21 0ZM8 12L8 14L0 14L0 12L8 12ZM5 7L5 9L0 9L0 7L5 7ZM19.56 2L4.43 2L12 8.8L19.56 2Z' fill='rgb(255, 117, 117)'/></svg>");
}

.auth-form__input--error.auth-form__input-password {
  background-image: url("data:image/svg+xml;utf8,<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M12.91 13C12.44 15.83 9.97 18 7 18C3.68 18 1 15.31 1 12C1 8.68 3.68 6 7 6C9.97 6 12.44 8.16 12.91 11L23 11L23 13L21 13L21 17L19 17L19 13L17 13L17 17L15 17L15 13L12.91 13ZM7 16C9.2 16 11 14.2 11 12C11 9.79 9.2 8 7 8C4.79 8 3 9.79 3 12C3 14.2 4.79 16 7 16Z' fill='rgb(255, 117, 117)'/></svg>");
}

.auth-form__input--error.auth-form__input-name,
.auth-form__input--error.auth-form__input-surname {
  background-image: url("data:image/svg+xml;utf8,<svg width='16' height='21' viewBox='0 0 16 21' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 21C0 16.58 3.58 13 8 13C12.41 13 16 16.58 16 21L14 21C14 17.68 11.31 15 8 15C4.68 15 2 17.68 2 21L0 21ZM8 12C4.68 12 2 9.31 2 6C2 2.68 4.68 0 8 0C11.31 0 14 2.68 14 6C14 9.31 11.31 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.78 10.21 2 8 2C5.78 2 4 3.78 4 6C4 8.21 5.78 10 8 10Z' fill='rgb(255, 117, 117)'/></svg>");
}

.auth-form__button {
  max-width: 328px;
  height: 52px;
  margin-top: 12px;
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

.auth-form__button:hover {
  background: rgb(69, 82, 110);
  color: rgba(255, 255, 255, 0.5);
}

.auth-form__button-register {
  margin-top: 23px;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 700;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.auth-form__button-register:hover {
  color: rgb(180, 169, 255);
}

.auth-form__toggle-button {
  margin-top: 23px;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 700;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.auth-form__toggle-button:hover {
  color: rgb(180, 169, 255);
}

@media (max-width: 1200px) {
  .auth-form {
    width: auto;
    height: auto;
    padding: 30px;
  }

  .auth-form__title {
    margin-bottom: 15px;
    font-size: 22px;
  }

  .auth-form__logo {
    width: 140px;
    margin-bottom: 20px;
  }
  .auth-form__input {
    height: 40px;
  }

  .auth-form__toggle-button {
    margin-top: 15px;
    font-size: 15px;
  }
}

@media (max-width: 900px) {
  .auth-form {
    width: auto;
    height: auto;
    padding: 25px;
  }

  .auth-form__logo {
    width: 140px;
    margin-bottom: 20px;
  }

  .auth-form__title {
    font-size: 20px;
  }

  .auth-form__input {
    height: 40px;
  }
}

@media (max-width: 500px) {
  .auth-form {
    width: auto;
    height: auto;
  }

  .auth-form__section {
    width: auto;
  }
}
</style>

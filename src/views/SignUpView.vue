<template>
  <div class="wrapper">
    <div class="container-enter">
      <div class="modal__block">
        <form class="modal__form-signup" novalidate @submit.prevent="onSubmit">
          <h2 class="modal__title">Регистрация</h2>
          <input id="regName" v-model.trim="name" class="modal__input" type="text" name="name" autocomplete="name"
            placeholder="Имя" @input="clearError" />
          <input id="regEmail" v-model.trim="email" class="modal__input" type="email" name="email" autocomplete="email"
            placeholder="Эл. почта" @input="clearError" />
          <input id="regPassword" v-model="password" class="modal__input" type="password" name="password"
            autocomplete="new-password" placeholder="Пароль" @input="clearError" />
          <p v-if="error" class="modal__error">{{ error }}</p>
          <button class="modal__btn-enter _hover01" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Регистрируем...' : 'Зарегистрироваться' }}
          </button>
          <p class="modal__reg-hint">
            Уже есть аккаунт?
            <RouterLink to="/login" class="modal__reg-link">Войдите здесь</RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { authApi } from '../services/auth';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const isSubmitting = ref(false);

async function onSubmit() {
  error.value = '';

  if (!name.value || !email.value || !password.value) {
    error.value = 'Заполните все поля';
    return;
  }

  isSubmitting.value = true;
  try {
    const data = await authApi.register({
      login: email.value,
      name: name.value,
      password: password.value,
    });
    const token = data.user?.token || data.token;
    if (token) localStorage.setItem('token', token);
    if (data.user) {
      localStorage.setItem('userInfo', JSON.stringify(data.user));
    }
    router.push('/');
  } catch (e) {
    error.value = e.message || 'Не удалось зарегистрироваться. Попробуйте ещё раз';
  } finally {
    isSubmitting.value = false;
  }
}

function clearError() {
  if (error.value) error.value = '';
}
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  background: var(--color-bg-main);
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-enter {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 16px;
}

.modal__block {
  background-color: var(--color-bg-card);
  max-width: 368px;
  width: 100%;
  padding: 50px 44px;
  border-radius: 12px;
  border: 0.7px solid var(--color-input-border);
}

.modal__title {
  color: var(--color-text);
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

.modal__input {
  width: 100%;
  padding: 14px;
  margin-bottom: 7px;
  background: var(--color-bg-main);
  border: 0.7px solid var(--color-input-border);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  color: var(--color-text);
}

.modal__input::placeholder {
  color: var(--color-text-muted);
}

.modal__input:focus {
  border-color: var(--color-primary);
}

.modal__error {
  color: #FF6D00;
  font-size: 13px;
  margin: 7px 0 0;
}

.modal__btn-enter {
  width: 100%;
  height: 48px;
  margin-top: 20px;
  background: var(--color-primary);
  border: none;
  border-radius: 4px;
  color: var(--color-white);
  font-size: 14px;
  cursor: pointer;
}

.modal__btn-enter:hover {
  background: var(--color-primary-hover);
}

.modal__reg-hint {
  margin-top: 20px;
  font-size: 14px;
  color: var(--color-text-muted);
  text-align: center;
}

.modal__reg-link {
  color: var(--color-primary);
  text-decoration: underline;
}
</style>

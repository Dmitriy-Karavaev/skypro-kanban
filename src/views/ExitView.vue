<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-window modal-exit">
      <h3 class="modal-exit__ttl">Выход из аккаунта</h3>
      <p class="modal-exit__text">Вы действительно хотите выйти?</p>
      <div class="modal-exit__actions">
        <button class="_btn-bg _hover01" type="button" @click="confirmExit">
          Выйти
        </button>
        <RouterLink to="/" class="_btn-bor _hover03">Отмена</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

function confirmExit() {
  localStorage.removeItem('userInfo');
  router.push('/login');
}

function close() {
  router.push('/');
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.modal-window {
  background-color: var(--color-bg-card);
  width: 100%;
  max-width: 370px;
  padding: 30px;
  border-radius: 10px;
  border: 0.7px solid var(--color-input-border);
  text-align: center;
}

.modal-exit__ttl {
  color: var(--color-text);
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.modal-exit__text {
  color: var(--color-text-muted);
  font-size: 14px;
  margin-bottom: 24px;
}

.modal-exit__actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.modal-exit__actions button,
.modal-exit__actions ._btn-bor {
  height: 40px;
  padding: 0 20px;
  border-radius: 4px;
  font-size: 14px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
</style>

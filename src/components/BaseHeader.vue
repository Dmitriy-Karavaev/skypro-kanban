<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <a href="#" class="header__logo">skypro</a>
        <div class="header__actions">
          <button class="header__create" @click="$emit('create-task')">Создать новую задачу</button>
          <button class="header__user" @click="isPopupOpen = !isPopupOpen">
            Ivan Ivanov <span class="header__arrow">▾</span>
          </button>
          <div class="header__pop-user-set" :class="{ _show: isPopupOpen }">
            <p class="header__popup-name">Ivan Ivanov</p>
            <p class="header__popup-mail">ivan.ivanov@mail.ru</p>
            <button
              class="header__popup-exit"
              @click="isPopupOpen = false; $emit('exit')"
            >Выйти</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

defineEmits(['create-task', 'exit']);
const isPopupOpen = ref(false);
</script>

<style scoped>
.header {
  background: var(--color-bg-header);
}

.header__block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.header__logo {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
}

.header__actions {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
}

.header__create {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  background: var(--color-primary);
  color: var(--color-white);
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}

.header__create:hover {
  background: var(--color-primary-hover);
}

.header__user {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  background: var(--color-bg-card);
  color: var(--color-text);
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}

.header__user:hover {
  color: var(--color-primary-hover);
}

.header__pop-user-set {
  display: none;
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 10;
  min-width: 180px;
  padding: 16px;
  border-radius: 10px;
  background: var(--color-bg-card);
  box-shadow: var(--shadow-popup);
}

.header__pop-user-set._show {
  display: block;
}

.header__popup-name {
  font-size: 14px;
  font-weight: 600;
}

.header__popup-mail {
  margin-top: 4px;
  font-size: 12px;
  color: var(--color-text-muted);
}

.header__popup-exit {
  margin-top: 12px;
  padding: 8px 12px;
  width: 100%;
  border: none;
  border-radius: 6px;
  background: var(--color-danger);
  color: var(--color-white);
  font-family: inherit;
  cursor: pointer;
}

.container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}
</style>

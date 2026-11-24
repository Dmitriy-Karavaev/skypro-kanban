<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <a href="/" class="header__logo">
          <img src="@/assets/logo.png" alt="Skypro" />
        </a>
        <nav class="header__nav">
          <RouterLink to="/card/add" class="header__btn-main-new">
            Создать новую задачу
          </RouterLink>
          <a href="#" ref="userLink" class="header__user" @click.prevent="togglePopup">
            Ivan Ivanov
          </a>
          <div v-if="isPopupOpen" ref="popup" class="header__pop-user-set">
            <p class="pop-user-set__name">Ivan Ivanov</p>
            <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
            <div class="pop-user-set__theme">
              <p>Тёмная тема</p>
              <input type="checkbox" class="checkbox" />
            </div>
            <button type="button" @click="logout">Выйти</button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const isPopupOpen = ref(false);
const popup = ref(null);
const userLink = ref(null);
const router = useRouter();

function togglePopup() {
  isPopupOpen.value = !isPopupOpen.value;
}

function handleClickOutside(event) {
  if (
    isPopupOpen.value &&
    popup.value &&
    !popup.value.contains(event.target) &&
    userLink.value &&
    !userLink.value.contains(event.target)
  ) {
    isPopupOpen.value = false;
  }
}
function logout() {
  localStorage.removeItem('userInfo');
  isPopupOpen.value = false;
  router.push('/login');
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));
</script>


<style scoped>
.container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}

/* ---------- шапка ---------- */
.header {
  width: 100%;
  background: var(--color-bg-card);
}

.header__block {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 10px;
}

.header__logo img {
  width: 85px;
}

.header__nav {
  display: flex;
  align-items: center;
  position: relative;
}

.header__btn-main-new {
  width: 178px;
  height: 30px;
  margin-right: 20px;
  border: none;
  border-radius: 4px;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.header__btn-main-new:hover {
  background: var(--color-primary-hover);
}

.header__user {
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-primary);
  text-decoration: none;
}

.header__user::after {
  content: '';
  width: 6px;
  height: 6px;
  margin: -6px 0 0 5px;
  border-left: 1.9px solid var(--color-primary);
  border-bottom: 1.9px solid var(--color-primary);
  transform: rotate(-45deg);
}

.header__user:hover {
  color: var(--color-primary-hover);
}

.header__user:hover::after {
  border-left-color: var(--color-primary-hover);
  border-bottom-color: var(--color-primary-hover);
}

.header__pop-user-set {
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  padding: 34px;
  border: 0.7px solid var(--color-input-border);
  border-radius: 10px;
  background: var(--color-bg-card);
  box-shadow: var(--shadow-popup);
  text-align: center;
  z-index: 2;
}

.pop-user-set__name {
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
}

.pop-user-set__mail {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--color-text-muted);
}

.pop-user-set__theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  font-size: 14px;
}

.pop-user-set__theme input {
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: var(--color-bg-main);
  appearance: none;
  cursor: pointer;
}

.pop-user-set__theme input::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--color-text-muted);
  transition: 0.5s;
}

.pop-user-set__theme input:checked::before {
  left: 12px;
}

.header__pop-user-set button {
  width: 72px;
  height: 30px;
  background: transparent;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  color: var(--color-primary);
  cursor: pointer;
}
</style>

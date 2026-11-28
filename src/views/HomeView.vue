<template>
  <div class="wrapper">
    <BaseHeader />
    <main class="main">
      <div class="container">
        <div class="main__block">
          <p v-if="store.isLoading" class="main__message">Загружаем задачи...</p>
          <p v-else-if="store.error" class="main__error">
            {{ store.error }}
            <button type="button" class="main__retry" @click="fetchTasks">
              Попробовать ещё раз
            </button>
          </p>
          <div v-else class="main__content">
            <AppColumn v-for="column in columns" :key="column.title" :title="column.title" :cards="column.cards" />
          </div>
          <RouterView />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import AppColumn from '@/components/AppColumn.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import { columnTitles } from '@/lib/data';
import { store, fetchTasks } from '@/lib/store';

onMounted(fetchTasks);

const columns = computed(() =>
  columnTitles.map((title) => ({
    title,
    cards: store.cards.filter((card) => card.status === title),
  }))
);
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  background: var(--color-bg);
}

.container {
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
}

.main {
  background: var(--color-bg-main);
}

.main__block {
  padding: 25px 0 49px;
}

.main__content {
  display: flex;
}

.main__message {
  color: var(--color-text-muted);
  font-size: 16px;
}

.main__error {
  color: #FF6D00;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.main__retry {
  background: none;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  color: var(--color-primary);
  cursor: pointer;
  padding: 6px 12px;
  font-size: 14px;
}

@media screen and (max-width: 1200px) {
  .main__block {
    padding: 40px 0 64px;
  }

  .main__content {
    display: block;
  }
}

@media screen and (max-width: 495px) {
  .container {
    padding: 0 16px;
  }
}
</style>

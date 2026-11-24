<template>
  <div class="wrapper">
    <BaseHeader />
    <main class="main">
      <div class="container">
        <div class="main__block">
          <div class="main__content">
            <Column v-for="column in columns" :key="column.title" :title="column.title" :cards="column.cards" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

vue
<script setup>
import { computed } from 'vue';
import Column from '@/components/Column.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import { columnTitles } from '@/lib/data';
import { store } from '@/lib/store';

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

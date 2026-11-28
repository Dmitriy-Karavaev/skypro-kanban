<template>
  <div class="main__column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="cards">
      <TaskItem v-for="card in cards" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<script setup>
import TaskItem from '@/components/TaskItem.vue';

defineProps({
  title: { type: String, required: true },
  cards: { type: Array, required: true },
});
</script>

<style scoped>
.main__column {
  width: 20%;
}

.column__title {
  margin: 15px 0;
  padding: 0 10px;
}

.column__title p {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.cards {
  width: 100%;
}

@media screen and (max-width: 1200px) {
  .main__column {
    width: 100%;
  }

  .cards {
    display: flex;
    overflow-x: auto;
  }
}
</style>

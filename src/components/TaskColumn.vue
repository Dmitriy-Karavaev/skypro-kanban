<template>
  <section class="column">
    <h2 class="column__title">{{ title }}</h2>
    <div class="column__cards">
      <Task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @open-task="$emit('open-task', $event)"
      />
    </div>
  </section>
</template>

<script setup>
  import Task from './Task.vue';

  defineProps({
    title: { type: String, required: true },
    tasks: { type: Array, default: () => [] },
  });
  defineEmits(['open-task']);
</script>

<style scoped>
  .column {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px 14px 18px;
    border-radius: 10px;
    background: var(--color-bg-column);
  }

  .column__title {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-muted);
  }

  .column__cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>

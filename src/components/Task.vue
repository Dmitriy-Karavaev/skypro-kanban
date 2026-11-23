<template>
  <article class="task" @click="$emit('open-task', task)">
    <p class="task__topic" :style="topicStyle">{{ task.topic }}</p>
    <h3 class="task__title">{{ task.title }}</h3>
    <p class="task__date">{{ task.date }}</p>
  </article>
</template>

<script setup>
  import { computed } from 'vue';
  import { topicColors } from '../lib/theme';

  const props = defineProps({
    task: { type: Object, required: true },
  });
  defineEmits(['open-task']);

  const topicStyle = computed(() => topicColors[props.task.topic] || {});
</script>

<style scoped>
  .task {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border-radius: 10px;
    background: var(--color-bg-card);
    cursor: pointer;
  }

  .task__topic {
    align-self: flex-start;
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 12px;
  }

  .task__title {
    font-size: 14px;
    font-weight: 500;
  }

  .task__date {
    margin-top: auto;
    font-size: 12px;
    color: var(--color-text-muted);
  }
</style>

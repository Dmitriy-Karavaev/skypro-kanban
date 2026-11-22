<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <p class="modal__topic" :style="{ backgroundColor: topicColor }">{{ task.topic }}</p>
      <h2 class="modal__title">{{ task.title }}</h2>
      <p class="modal__description">{{ task.description || 'Описание отсутствует' }}</p>
      <p class="modal__date">Дата: {{ task.date }}</p>
      <div class="modal__actions">
        <button class="modal__button" @click="$emit('close')">Закрыть</button>
        <button class="modal__button modal__button--danger" @click="$emit('remove')">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { topicColors } from '../lib/theme';

  const props = defineProps({ task: { type: Object, required: true } });
  defineEmits(['close', 'remove']);

  const topicColor = computed(() => topicColors[props.task.topic] || 'transparent');
</script>

<style scoped>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
  }

  .modal {
    width: 320px;
    padding: 24px;
    border-radius: 10px;
    background: var(--color-bg-card);
  }

  .modal__topic {
    align-self: flex-start;
    display: inline-block;
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 12px;
  }

  .modal__title {
    margin-top: 12px;
    font-size: 18px;
  }

  .modal__description {
    margin-top: 10px;
    font-size: 14px;
  }

  .modal__date {
    margin-top: 10px;
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .modal__actions {
    display: flex;
    gap: 10px;
    margin-top: 16px;
  }

  .modal__button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 6px;
    background: var(--color-primary);
    color: #FFFFFF;
    font-family: inherit;
    cursor: pointer;
  }

  .modal__button--danger {
    background: var(--color-danger);
  }
</style>

<template>
  <div v-if="open" class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h2 class="modal__title">Создать задачу</h2>
      <form class="modal__form" @submit.prevent="create">
        <input v-model="title" class="modal__input" placeholder="Название задачи" required />
        <textarea v-model="description" class="modal__input modal__input--area" placeholder="Описание задачи"></textarea>
        <select v-model="topic" class="modal__input">
          <option>Web Design</option>
          <option>Research</option>
          <option>Copywriting</option>
        </select>
        <div class="modal__actions">
          <button type="submit" class="modal__button">Создать</button>
          <button type="button" class="modal__button modal__button--ghost" @click="$emit('close')">Закрыть</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  defineProps({ open: { type: Boolean, default: false } });
  const emit = defineEmits(['close', 'create']);

  const title = ref('');
  const description = ref('');
  const topic = ref('Web Design');

  function create() {
    emit('create', { title: title.value, description: description.value, topic: topic.value });
    title.value = '';
    description.value = '';
    topic.value = 'Web Design';
  }
</script>

<style scoped>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-overlay);
  }

  .modal {
    width: 320px;
    padding: 24px;
    border-radius: 10px;
    background: var(--color-bg-card);
    box-shadow: var(--shadow-block);
  }

  .modal__title {
    margin-bottom: 16px;
    font-size: 18px;
  }

  .modal__form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .modal__input {
    padding: 10px;
    border: 1px solid #E0E0E0;
    border-radius: 6px;
    font-family: inherit;
    font-size: 14px;
    resize: none;
  }

  .modal__actions {
    display: flex;
    gap: 10px;
    margin-top: 8px;
  }

  .modal__button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 6px;
    background: var(--color-primary);
    color: var(--color-white);
    font-family: inherit;
    cursor: pointer;
  }

  .modal__button--ghost {
    background: var(--color-bg);
    color: var(--color-text);
  }
</style>

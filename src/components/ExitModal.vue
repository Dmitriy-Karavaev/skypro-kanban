<template>
  <div v-if="open" class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <h2 class="modal__title">Выйти из аккаунта?</h2>
      <div class="modal__actions">
        <button class="modal__button" @click="$emit('close')">Нет</button>
        <button class="modal__button modal__button--danger" @click="$emit('confirm')">Да, выйти</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({ open: { type: Boolean, default: false } });
  defineEmits(['close', 'confirm']);
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
    width: 300px;
    padding: 24px;
    border-radius: 10px;
    background: var(--color-bg-card);
    text-align: center;
  }

  .modal__title {
    font-size: 16px;
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
    color: var(--color-white);
    font-family: inherit;
    cursor: pointer;
  }

  .modal__button--danger {
    background: var(--color-danger);
  }
</style>

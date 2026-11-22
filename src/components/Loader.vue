<template>
  <div class="loader">
    <span
      class="loader__spinner"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></span>
    <p class="loader__text">Данные загружаются</p>
  </div>
</template>

<script setup>
defineProps({
  width: { type: Number, default: 48 },
  height: { type: Number, default: 48 },
});
</script>

<style scoped>
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 400px;
}

.loader__spinner {
  display: block;
  border: 4px solid rgba(108, 92, 231, 0.2);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: loader-spin 1s linear infinite;
}

.loader__text {
  font-size: 18px;
  font-weight: 600;
  animation: loader-pulse 1.5s ease-in-out infinite;
}

@keyframes loader-spin {
  to { transform: rotate(360deg); }
}

@keyframes loader-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>

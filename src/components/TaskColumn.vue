<template>
  <div class="main__column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <div class="cards">
      <Task v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script setup>
import Task from './Task.vue';

defineProps({
  title: { type: String, required: true },
  tasks: { type: Array, required: true }
});
</script>

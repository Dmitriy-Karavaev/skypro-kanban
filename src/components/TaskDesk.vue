<template>
  <div class="wrapper">
    <BaseHeader @create-task="isNewCardOpen = true" @exit="isExitOpen = true" />

    <main class="main">
      <div class="container">
        <div class="main__block">
          <div v-if="!loading" class="main__content">
            <TaskColumn
              v-for="status in statuses"
              :key="status"
              :title="status"
              :tasks="tasksByStatus(status)"
              @open-task="openTask"
            />
          </div>
          <div v-else class="loading">Данные загружаются</div>
        </div>
      </div>
    </main>

    <NewCardModal
      :open="isNewCardOpen"
      @close="isNewCardOpen = false"
      @create="addTask"
    />
    <TaskModal
      v-if="selectedTask"
      :task="selectedTask"
      @close="selectedTask = null"
      @remove="removeTask(selectedTask.id)"
    />
    <ExitModal
      :open="isExitOpen"
      @close="isExitOpen = false"
      @confirm="isExitOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { tasks as initialTasks } from '../mocks/data.js';
import BaseHeader from './BaseHeader.vue';
import TaskColumn from './TaskColumn.vue';
import NewCardModal from './NewCardModal.vue';
import TaskModal from './TaskModal.vue';
import ExitModal from './ExitModal.vue';

const statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'];

const tasks = ref(initialTasks.map((task) => ({ ...task, description: '' })));

const isNewCardOpen = ref(false);
const isExitOpen = ref(false);
const selectedTask = ref(null);
const loading = ref(true);

let nextId = initialTasks.length + 1;

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 3000);
});

function tasksByStatus(status) {
  return tasks.value.filter((task) => task.status === status);
}

function openTask(task) {
  selectedTask.value = task;
}

function addTask({ title, description, topic }) {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yy = String(now.getFullYear()).slice(2);

  tasks.value.unshift({
    id: nextId++,
    title,
    description,
    topic,
    date: `${dd}.${mm}.${yy}`,
    status: 'Без статуса'
  });
  isNewCardOpen.value = false;
}

function removeTask(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
  selectedTask.value = null;
}
</script>

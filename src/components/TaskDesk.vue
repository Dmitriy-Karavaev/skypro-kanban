<template>
  <div class="wrapper">
    <BaseHeader />

    <main class="main">
      <div class="container">
        <div class="main__block">
          <div class="main__content">
            <TaskColumn
              v-for="status in statuses"
              :key="status"
              :title="status"
              :tasks="tasksByStatus(status)"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseHeader from './BaseHeader.vue';
import TaskColumn from './TaskColumn.vue';

const statuses = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово'];

const tasks = ref([
  { id: 1,  title: 'Название задачи', topic: 'Web Design',  date: '30.10.23', status: 'Без статуса' },
  { id: 2,  title: 'Название задачи', topic: 'Research',    date: '30.10.23', status: 'Без статуса' },
  { id: 3,  title: 'Название задачи', topic: 'Web Design',  date: '30.10.23', status: 'Без статуса' },
  { id: 4,  title: 'Название задачи', topic: 'Copywriting', date: '30.10.23', status: 'Без статуса' },
  { id: 5,  title: 'Название задачи', topic: 'Web Design',  date: '30.10.23', status: 'Без статуса' },
  { id: 6,  title: 'Название задачи', topic: 'Research',    date: '30.10.23', status: 'Нужно сделать' },
  { id: 7,  title: 'Название задачи', topic: 'Research',    date: '30.10.23', status: 'В работе' },
  { id: 8,  title: 'Название задачи', topic: 'Copywriting', date: '30.10.23', status: 'В работе' },
  { id: 9,  title: 'Название задачи', topic: 'Web Design',  date: '30.10.23', status: 'В работе' },
  { id: 10, title: 'Название задачи', topic: 'Research',    date: '30.10.23', status: 'Тестирование' },
  { id: 11, title: 'Название задачи', topic: 'Research',    date: '30.10.23', status: 'Готово' }
]);

function tasksByStatus(status) {
  return tasks.value.filter((task) => task.status === status);
}
</script>

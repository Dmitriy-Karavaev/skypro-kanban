<template>
  <div class="kanban-board">
    <header class="kanban-header">
      <h1>Канбан-доска</h1>

      <!-- Форма добавления задачи -->
      <form class="add-task-form" @submit.prevent="addTask">
        <input
          v-model="newTaskText"
          type="text"
          placeholder="Что нужно сделать?"
          class="add-task-input"
        />
        <button type="submit" class="add-task-button">Добавить задачу</button>
      </form>
    </header>

    <div class="kanban-columns">
      <!-- Колонка: To Do -->
      <div class="column">
        <div class="column-header">To Do</div>
        <div class="column-body">
          <div
            v-for="task in tasks.toDo"
            :key="task.id"
            class="task-card"
          >
            {{ task.text }}
          </div>
        </div>
      </div>

      <!-- Колонка: In Progress -->
      <div class="column">
        <div class="column-header">In Progress</div>
        <div class="column-body">
          <div
            v-for="task in tasks.inProgress"
            :key="task.id"
            class="task-card"
          >
            {{ task.text }}
          </div>
        </div>
      </div>

      <!-- Колонка: Done -->
      <div class="column">
        <div class="column-header">Done</div>
        <div class="column-body">
          <div
            v-for="task in tasks.done"
            :key="task.id"
            class="task-card"
          >
            {{ task.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Задачи по колонкам
const tasks = ref({
  toDo: [
    { id: 1, text: 'Подготовить макет' },
    { id: 2, text: 'Настроить Git и npm' }
  ],
  inProgress: [
    { id: 3, text: 'Перенести вёрстку в Vue' }
  ],
  done: [
    { id: 4, text: 'Создать проект через create-vue' },
    { id: 5, text: 'Сделать первый коммит и push' }
  ]
});

// Текст из поля ввода
const newTaskText = ref('');

// Счётчик для уникальных id
let nextId = 6;

function addTask() {
  const text = newTaskText.value.trim();

  // Не добавляем пустые задачи
  if (!text) return;

  tasks.value.toDo.push({
    id: nextId++,
    text: text
  });

  // Очищаем поле ввода после добавления
  newTaskText.value = '';
}
</script>

<style scoped>
.kanban-board {
  padding: 16px;
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}
.kanban-header {
  margin-bottom: 20px;
  text-align: center;
}
.add-task-form {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
}
.add-task-input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 280px;
}
.add-task-input:focus {
  outline: none;
  border-color: #4a90d9;
}
.add-task-button {
  padding: 8px 16px;
  background: #4a90d9;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}
.add-task-button:hover {
  background: #3a7bc0;
}
.kanban-columns {
  display: flex;
  gap: 16px;
  justify-content: center;
}
.column {
  flex: 1;
  background: #f5f6f7;
  border-radius: 8px;
  padding: 12px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}
.column-header {
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}
.task-card {
  background: #ffffff;
  border: 1px solid #ddd;
  padding: 10px 12px;
  border-radius: 6px;
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: grab;
}
.task-card:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

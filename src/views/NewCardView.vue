<template>
  <div class="modal-overlay" @click.self="close">
    <div class="pop-new-card__block">
      <div class="pop-new-card__content">
        <h3 class="pop-new-card__ttl">Создание задачи</h3>
        <button class="pop-new-card__close" aria-label="Закрыть" @click="close">
          ✕
        </button>

        <div class="pop-new-card__wrap">
          <form class="pop-new-card__form form-new" @submit.prevent="onCreate">
            <div class="form-new__block">
              <label for="formTitle" class="subttl">Название задачи</label>
              <input id="formTitle" name="title" v-model.trim="title" class="form-new__input" type="text"
                placeholder="Введите название задачи..." @input="clearError" />
              <p v-if="error" class="form-error">{{ error }}</p>
            </div>
            <div class="form-new__block">
              <label for="textArea" class="subttl">Описание задачи</label>
              <textarea id="textArea" name="description" v-model.trim="description" class="form-new__area"
                placeholder="Введите описание задачи..."></textarea>
            </div>
          </form>

          <div class="pop-new-card__calendar calendar">
            <p class="calendar__ttl subttl">Даты</p>
            <div class="calendar__block">
              <label for="dateInput" class="subttl">Срок исполнения</label>
              <input id="dateInput" name="deadline" v-model="deadline" class="form-new__input" type="date"
                @input="clearDateError" />
              <p v-if="dateError" class="form-error">{{ dateError }}</p>
            </div>
          </div>
        </div>

        <div class="pop-new-card__categories categories">
          <p class="categories__p subttl">Категория</p>
          <div class="categories__themes">
            <div v-for="topic in topics" :key="topic.name" class="categories__theme" :class="[
              topic.className,
              { '_active-category': topic.name === selectedTopic },
            ]" @click="selectedTopic = topic.name">
              <p :class="topic.className">{{ topic.name }}</p>
            </div>
          </div>
        </div>

        <button class="form-new__create _btn-bg" type="submit" :disabled="isSubmitting" @click="onCreate">
          {{ isSubmitting ? 'Отправляем...' : 'Создать задачу' }}
        </button>
        <p v-if="serverError" class="form-error">{{ serverError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addCard } from '@/lib/store';

const router = useRouter();

const topics = [
  { name: 'Web Design', className: '_orange' },
  { name: 'Research', className: '_green' },
  { name: 'Copywriting', className: '_purple' },
];

const title = ref('');
const description = ref('');
const deadline = ref('');
const selectedTopic = ref('Web Design');
const error = ref('');
const dateError = ref('');
const serverError = ref('');
const isSubmitting = ref(false);

function clearError() {
  if (error.value) error.value = '';
}

function clearDateError() {
  if (dateError.value) dateError.value = '';
}

function close() {
  router.push('/');
}

async function onCreate() {
  if (isSubmitting.value) return;

  error.value = '';
  dateError.value = '';
  serverError.value = '';

  if (!title.value) error.value = 'Введите название задачи';
  if (!deadline.value) dateError.value = 'Выберите срок исполнения';

  if (error.value || dateError.value) return;

  isSubmitting.value = true;
  try {
    // дату отдаём как есть — '2026-11-28',
    // в ISO её превратит addCard в store.js
    await addCard({
      title: title.value,
      description: description.value,
      topic: selectedTopic.value,
      date: deadline.value,
    });
    router.push('/');
  } catch (e) {
    serverError.value = e.message;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 16px;
}

.pop-new-card__block {
  background-color: var(--color-bg-card);
  max-width: 793px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid var(--color-input-border);
  position: relative;
}

.pop-new-card__ttl {
  color: var(--color-text);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
}

.pop-new-card__close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: var(--color-text-muted);
  font-size: 20px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}

.pop-new-card__close:hover {
  color: var(--color-text);
}

.pop-new-card__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}

.pop-new-card__form {
  max-width: 370px;
  width: 100%;
  margin-bottom: 20px;
}

.form-new__block {
  margin-bottom: 20px;
}

.form-new__block label {
  display: block;
  margin-bottom: 14px;
}

.form-new__input,
.form-new__area {
  max-width: 370px;
  width: 100%;
  padding: 14px;
  background: var(--color-bg-main);
  border: 0.7px solid var(--color-input-border);
  border-radius: 8px;
  font-size: 14px;
  letter-spacing: -0.14px;
  outline: none;
  color: var(--color-text);
}

.form-new__input::placeholder,
.form-new__area::placeholder {
  color: var(--color-text-muted);
}

.form-new__input:focus,
.form-new__area:focus {
  border-color: var(--color-primary);
}

.form-new__area {
  min-height: 200px;
  resize: vertical;
}

.form-error {
  color: #FF6D00;
  font-size: 13px;
  margin: 5px 0 0;
}

.pop-new-card__calendar {
  max-width: 370px;
  width: 100%;
}

.calendar__ttl {
  margin-bottom: 14px;
}

.calendar__block label {
  display: block;
  margin-bottom: 14px;
}

.categories {
  padding: 12px 0;
  margin-bottom: 12px;
}

.categories__p {
  margin-bottom: 14px;
}

.categories__themes {
  display: flex;
}

.categories__theme {
  display: inline-block;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  opacity: 0.4;
  cursor: pointer;
}

.categories__theme._active-category {
  opacity: 1;
}

.categories__theme p {
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
}

.subttl {
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

._btn-bg {
  border-radius: 4px;
  background: var(--color-primary);
  border: none;
  outline: none;
  color: var(--color-white);
  font-size: 14px;
  cursor: pointer;
}

._btn-bg:hover {
  background: var(--color-primary-hover);
}

._btn-bg:disabled {
  opacity: 0.6;
  cursor: default;
}

.form-new__create {
  height: 48px;
  width: 100%;
}

._orange {
  background: #FFE4C2;
  color: #FF6D00;
}

._green {
  background: #B4FDD1;
  color: #06B16E;
}

._purple {
  background: #E9D4FF;
  color: #9A48F1;
}

@media screen and (max-width: 800px) {
  .pop-new-card__wrap {
    display: block;
  }
}
</style>

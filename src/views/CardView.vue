<template>
  <div class="modal-overlay" @click.self="close">
    <div v-if="card" class="pop-browse__block">
      <div class="pop-browse__top-block">
        <h3 v-if="!editing" class="pop-browse__ttl">
          Задача №{{ route.params.id }}. {{ card.title }}
        </h3>
        <input v-else id="card-title" name="title" v-model.trim="form.title" class="pop-browse__ttl-input" type="text"
          placeholder="Название задачи" />
        <button class="pop-browse__close" aria-label="Закрыть" @click="close">
          ✕
        </button>
      </div>

      <div class="pop-browse__wrap">
        <div class="pop-browse__form">
          <div class="categories">
            <p class="categories__p subttl">Категория</p>
            <div class="categories__themes">
              <button v-for="topic in topics" :key="topic" type="button" class="categories__theme"
                :class="[topicClassOf(topic), { _active: editing && form.topic === topic }]" :disabled="!editing"
                @click="form.topic = topic">
                <p>{{ topic }}</p>
              </button>
            </div>
          </div>

          <div class="form-browse__block">
            <p class="subttl">Описание задачи</p>
            <div v-if="!editing" class="form-browse__area">
              {{ description }}
            </div>
            <textarea v-else id="card-description" name="description" v-model="form.description"
              class="form-browse__area" placeholder="Введите описание задачи..."></textarea>
            <p v-if="editing && formError" class="form-error">{{ formError }}</p>
          </div>
        </div>

        <div class="pop-browse__btn-browse">
          <div class="status">
            <p class="status__p subttl">Статус</p>
            <div v-if="!editing" class="status__themes">
              <div class="status__theme">
                <p>{{ card.status }}</p>
              </div>
            </div>
            <div v-else class="status__themes">
              <button v-for="item in store.statuses" :key="item" type="button" class="status__theme status__theme-btn"
                :class="{ _active: form.status === item }" @click="selectStatus(item)">
                <p>{{ item }}</p>
              </button>
            </div>
          </div>

          <div class="status">
            <p class="status__p subttl">Дата исполнения</p>
            <div class="status__themes">
              <div v-if="!editing" class="status__theme">
                <p>{{ card.date }}</p>
              </div>
              <input v-else id="card-deadline" name="deadline" v-model="form.date" class="status__date-input"
                type="date" />
            </div>
          </div>

          <template v-if="!editing">
            <button class="_btn-bg _hover01" type="button" :disabled="isSaving" @click="startEdit">
              Редактировать
            </button>
            <button class="_btn-bor _hover03" type="button" :disabled="isSaving" @click="removeCard">
              Удалить
            </button>
          </template>
          <template v-else>
            <button class="_btn-bg _hover01" type="button" :disabled="isSaving" @click="saveEdit">
              {{ isSaving ? 'Сохраняем...' : 'Сохранить' }}
            </button>
            <button class="_btn-bor _hover03" type="button" :disabled="isSaving" @click="cancelEdit">
              Отмена
            </button>
          </template>
          <p v-if="serverError" class="form-error">{{ serverError }}</p>
        </div>
      </div>
    </div>

    <p v-else class="not-found">Карточка не найдена</p>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store, updateCard, removeCard as removeCardApi } from '@/lib/store';

const route = useRoute();
const router = useRouter();

const topics = ['Web Design', 'Research', 'Copywriting'];

const card = computed(() =>
  store.cards.find((item) => String(item.id) === route.params.id)
);

const editing = ref(false);
const formError = ref('');
const serverError = ref('');
const isSaving = ref(false);
const form = reactive({
  title: '',
  description: '',
  topic: '',
  date: '',
  status: '',
});

function topicClassOf(topic) {
  switch (topic) {
    case 'Web Design':
      return '_orange';
    case 'Research':
      return '_green';
    case 'Copywriting':
      return '_purple';
    default:
      return '';
  }
}

const description = computed(
  () => card.value?.description ?? 'Описание пока не заполнено'
);

// дата хранится как «дд.мм.гггг» (иногда с двузначным годом),
// а input type=date понимает только «гггг-мм-дд»
function toIsoDate(dmy) {
  if (!dmy) return '';
  const parts = dmy.split('.');
  if (parts.length !== 3) return '';
  const [d, m, y] = parts;
  const year = y.length === 2 ? `20${y}` : y;
  return `${year}-${m}-${d}`;
}

function close() {
  router.push('/');
}

function startEdit() {
  form.title = card.value.title;
  form.description = card.value.description || '';
  form.topic = card.value.topic;
  form.date = toIsoDate(card.value.date);
  form.status = card.value.status;
  formError.value = '';
  serverError.value = '';
  editing.value = true;
}

function cancelEdit() {
  editing.value = false;
  formError.value = '';
  serverError.value = '';
}

function selectStatus(item) {
  form.status = item;
}

async function saveEdit() {
  if (!form.title) {
    formError.value = 'Введите название задачи';
    return;
  }
  if (!form.date) {
    formError.value = 'Выберите срок исполнения';
    return;
  }

  isSaving.value = true;
  serverError.value = '';
  try {
    // form.date в формате YYYY-MM-DD, в ISO его превратит updateCard
    await updateCard(card.value.id, {
      title: form.title,
      description: form.description,
      topic: form.topic,
      status: form.status,
      date: form.date,
    });
    editing.value = false;
  } catch (e) {
    serverError.value = e.message;
  } finally {
    isSaving.value = false;
  }
}

async function removeCard() {
  isSaving.value = true;
  serverError.value = '';
  try {
    await removeCardApi(card.value.id);
    router.push('/');
  } catch (e) {
    serverError.value = e.message;
  } finally {
    isSaving.value = false;
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

.pop-browse__block {
  background-color: var(--color-bg-card);
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid var(--color-input-border);
  position: relative;
}

.pop-browse__top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.pop-browse__ttl {
  color: var(--color-text);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}

.pop-browse__ttl-input {
  color: var(--color-text);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  margin-right: 16px;
}

.pop-browse__close {
  color: var(--color-text-muted);
  background: none;
  border: none;
  outline: none;
  font-size: 16px;
  cursor: pointer;
}

.pop-browse__close:hover {
  color: var(--color-text);
}

.pop-browse__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.pop-browse__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}

.pop-browse__btn-browse {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 230px;
}

.pop-browse__btn-browse button {
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
}

.categories {
  margin-bottom: 20px;
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
  border: none;
  cursor: pointer;
  margin-right: 7px;
}

.categories__theme p {
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  white-space: nowrap;
}

.categories__theme:disabled {
  cursor: default;
}

.categories__theme._active {
  outline: 1px solid currentColor;
}

.form-browse__block {
  display: flex;
  flex-direction: column;
}

.form-browse__area {
  max-width: 370px;
  width: 100%;
  padding: 14px;
  background: var(--color-bg-main);
  border: 0.7px solid var(--color-input-border);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
}

.form-error {
  color: #FF6D00;
  font-size: 13px;
  margin: 5px 0;
}

.status {
  margin-bottom: 11px;
}

.status__p {
  margin-bottom: 14px;
}

.status__themes {
  display: flex;
  flex-wrap: wrap;
}

.status__theme {
  border-radius: 24px;
  border: 0.7px solid var(--color-input-border);
  color: var(--color-text-muted);
  padding: 11px 14px 10px;
  margin-bottom: 7px;
}

.status__theme p {
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}

.status__theme-btn {
  border: 0.7px solid var(--color-input-border);
  background: transparent;
  color: var(--color-text-muted);
  font-family: inherit;
  margin-right: 7px;
  cursor: pointer;
}

.status__theme-btn._active {
  border-color: currentColor;
  color: var(--color-primary);
}

.status__date-input {
  border: 0.7px solid var(--color-input-border);
  border-radius: 24px;
  color: var(--color-text);
  padding: 5px 14px;
  font-size: 14px;
  background: var(--color-bg-card);
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

._btn-bor {
  border-radius: 4px;
  border: 0.7px solid var(--color-primary);
  outline: none;
  background: transparent;
  color: var(--color-primary);
  font-size: 14px;
  cursor: pointer;
}

._btn-bor:hover {
  background: var(--color-primary-hover);
  color: var(--color-white);
}

.not-found {
  text-align: center;
  color: var(--color-white);
  font-size: 20px;
  padding: 40px 0;
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
  .pop-browse__wrap {
    display: block;
  }
}
</style>

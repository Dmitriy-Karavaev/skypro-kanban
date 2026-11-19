<template>
  <div class="pop-new-card" :class="{ _show: open }">
    <div class="pop-new-card__container">
      <div class="pop-new-card__block">
        <div class="pop-new-card__content">
          <h3 class="pop-new-card__ttl">Создание задачи</h3>
          <a href="#" class="pop-new-card__close" @click.prevent="$emit('close')">&#10006;</a>
          <div class="pop-new-card__wrap">
            <form class="pop-new-card__form form-new" action="#" @submit.prevent>
              <div class="form-new__block">
                <label for="formTitle" class="subttl">Название задачи</label>
                <input class="form-new__input" type="text" name="name" id="formTitle"
                  placeholder="Введите название задачи..." autofocus v-model="title">
              </div>
              <div class="form-new__block">
                <label for="textArea" class="subttl">Описание задачи</label>
                <textarea class="form-new__area" name="text" id="textArea"
                  placeholder="Введите описание задачи..." v-model="description"></textarea>
              </div>
            </form>
            <div class="pop-new-card__calendar calendar">
              <p class="calendar__ttl subttl">Даты</p>
              <div class="calendar__block">
                <div class="calendar__nav">
                  <div class="calendar__month">Сентябрь 2023</div>
                  <div class="nav__actions">
                    <div class="nav__action">
                      <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                        <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
                      </svg>
                    </div>
                    <div class="nav__action">
                      <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                        <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="calendar__content">
                  <div class="calendar__days-names">
                    <div v-for="day in dayNames" :key="day" class="calendar__day-name"
                      :class="{ '-weekend-': day === 'сб' || day === 'вс' }">{{ day }}</div>
                  </div>
                  <div class="calendar__cells">
                    <div v-for="(cell, i) in cells" :key="i" class="calendar__cell"
                      :class="{ _other_month: cell.o, _cell_day: !cell.o, _weekend: cell.w, _current: cell.c }">
                      {{ cell.n }}
                    </div>
                  </div>
                </div>
                <div class="calendar__period">
                  <p class="calendar__p date-end">Выберите срок исполнения <span class="date-control"></span>.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="pop-new-card__categories categories">
            <p class="categories__p subttl">Категория</p>
            <div class="categories__themes">
              <div v-for="cat in categories" :key="cat.name" class="categories__theme"
                :class="[cat.cls, { _active_category: selected === cat.name }]"
                @click="selected = cat.name">
                <p :class="cat.cls">{{ cat.name }}</p>
              </div>
            </div>
          </div>
          <button class="form-new__create _hover01" @click="submit">Создать задачу</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({ open: { type: Boolean, default: false } });
const emit = defineEmits(['close', 'create']);

const dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const cells = [
  { n: 28, o: 1 }, { n: 29, o: 1 }, { n: 30, o: 1 },
  { n: 31 }, { n: 1 }, { n: 2, w: 1 }, { n: 3, w: 1 },
  { n: 4 }, { n: 5 }, { n: 6 }, { n: 7 }, { n: 8, c: 1 }, { n: 9, w: 1 }, { n: 10, w: 1 },
  { n: 11 }, { n: 12 }, { n: 13 }, { n: 14 }, { n: 15 }, { n: 16, w: 1 }, { n: 17, w: 1 },
  { n: 18 }, { n: 19 }, { n: 20 }, { n: 21 }, { n: 22 }, { n: 23, w: 1 }, { n: 24, w: 1 },
  { n: 25 }, { n: 26 }, { n: 27 }, { n: 28 }, { n: 29 }, { n: 30, w: 1 },
  { n: 1, o: 1, w: 1 }
];

const categories = [
  { name: 'Web Design', cls: '_orange' },
  { name: 'Research', cls: '_green' },
  { name: 'Copywriting', cls: '_purple' }
];

const title = ref('');
const description = ref('');
const selected = ref('Web Design');

function submit() {
  if (!title.value.trim()) return;
  emit('create', { title: title.value, description: description.value, topic: selected.value });
  title.value = '';
  description.value = '';
  selected.value = 'Web Design';
}
</script>

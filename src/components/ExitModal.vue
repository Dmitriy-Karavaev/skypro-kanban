<template>
  <div class="pop-exit" :class="{ _show: open }">
    <div class="pop-exit__container">
      <div class="pop-exit__block">
        <div class="pop-exit__ttl">
          <h2>Выйти из аккаунта?</h2>
        </div>
        <form class="pop-exit__form" action="#" @submit.prevent>
          <div class="pop-exit__form-group">
            <button class="pop-exit__exit-yes _hover01" @click.prevent="$emit('confirm')">
              <a href="#" @click.prevent>Да, выйти</a>
            </button>
            <button class="pop-exit__exit-no _hover03" @click.prevent="$emit('close')">
              <a href="#" @click.prevent>Нет, остаться</a>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ open: { type: Boolean, default: false } });
defineEmits(['close', 'confirm']);
</script>

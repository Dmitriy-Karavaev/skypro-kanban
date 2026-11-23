import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import { theme } from './lib/theme'; // импорт объекта цветов

// превращаем объект в CSS-переменные на корне страницы
for (const [name, value] of Object.entries(theme)) {
  document.documentElement.style.setProperty(`--${name}`, value);
}

createApp(App).mount('#app');

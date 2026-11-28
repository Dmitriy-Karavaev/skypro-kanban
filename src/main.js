import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { theme } from './lib/theme';

for (const [name, value] of Object.entries(theme)) {
  document.documentElement.style.setProperty(`--${name}`, value);
}

createApp(App).use(router).mount('#app');

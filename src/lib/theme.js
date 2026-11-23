// Палитра темы проекта
export const theme = {
  // фон и поверхности
  'color-bg': '#F1F1F1',            // фон страницы
  'color-bg-header': '#F9FAFB',     // фон шапки
  'color-bg-column': '#F0F0F0',     // фон колонок
  'color-bg-card': '#FFFFFF',       // карточки и модалки

  // текст
  'color-text': '#151515',
  'color-text-muted': '#94A6BE',

  // акценты и действия
  'color-primary': '#565EEF',       // фиолетовые кнопки
  'color-primary-hover': '#33399B',
  'color-danger': '#EA4949',        // удаление / выход

  // вспомогательные
  'color-white': '#FFFFFF',
  'color-border-light': '#E7E7E7',
  'color-overlay': 'rgba(0, 0, 0, 0.4)',
  'color-primary-fade': 'rgba(86, 94, 239, 0.2)',

  // тени
  'shadow-popup': '0px 10px 39px rgba(26, 56, 101, 0.21)',
  'shadow-block': '0px 4px 22px rgba(0, 0, 0, 0.1)',

  // плашки тем: фон и цвет текста по отдельности
  'topic-orange-bg': '#FFE4CB',
  'topic-orange-text': '#ECA43E',
  'topic-green-bg': '#D3F2E2',
  'topic-green-text': '#3FBB73',
  'topic-purple-bg': '#F2DEFF',
  'topic-purple-text': '#9A48F1',
};

// Цвета плашек тем — пара «фон + текст» для подстановки через :style
export const topicColors = {
  'Web Design': {
    backgroundColor: 'var(--topic-orange-bg)',
    color: 'var(--topic-orange-text)',
  },
  'Research': {
    backgroundColor: 'var(--topic-green-bg)',
    color: 'var(--topic-green-text)',
  },
  'Copywriting': {
    backgroundColor: 'var(--topic-purple-bg)',
    color: 'var(--topic-purple-text)',
  },
};

export const theme = {
  'color-bg': '#E5E5E5',          // фон страницы
  'color-bg-header': '#D8D8D8',   // фон шапки
  'color-bg-column': '#D8D8D8',   // фон колонок
  'color-bg-card': '#FFFFFF',     // карточки
  'color-text': '#151515',
  'color-text-muted': '#949494',
  'color-primary': '#6C5CE7',     // фиолетовые кнопки
  'color-primary-hover': '#5A49D8',
  'color-danger': '#EA4949',      // удаление / выход
  'color-topic-orange': '#F7B23B', // Web Design
  'color-topic-green': '#8BD977',  // Research
  'color-topic-purple': '#C36AF0', // Copywriting
};

// Цвета плашек тем — отдельная карта для подстановки по названию темы
export const topicColors = {
  'Web Design': 'var(--color-topic-orange)',
  'Research': 'var(--color-topic-green)',
  'Copywriting': 'var(--color-topic-purple)',
};

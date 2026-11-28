import { reactive, watch } from 'vue'
import { cards as defaultCards, columnTitles } from './data'

const STORAGE_KEY = 'cards'

function loadCards() {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    } catch {
      // повреждённые данные — начинаем с демо-набора
    }
  }

  return [...defaultCards]
}

export const store = reactive({
  cards: loadCards(),
  statuses: [...columnTitles],
})

export function saveCards() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.cards))
}

watch(() => store.cards, saveCards, { deep: true })

export function addCard({ title, description, topic, date }) {
  const maxId = store.cards.reduce((max, card) => Math.max(max, Number(card.id) || 0), 0)

  store.cards.push({
    id: String(maxId + 1),
    topic,
    title,
    description,
    date,
    status: 'Без статуса',
  })
}
